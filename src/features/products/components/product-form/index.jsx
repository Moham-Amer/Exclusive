import { productFormValidationSchema } from './config';
import { Loader } from '../../../../shared/components/loader';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { productInitState } from '../../store/state';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useNavigate, useSearchParams } from 'react-router';
import { appRoutes } from '../../../../routes'
import ProductsService from '../../services/api';
import omit from 'lodash/omit';
import './style.css';

export function ProductForm() {
    const navigate = useNavigate();
    const queryClient = useQueryClient()
    const [searchParams] = useSearchParams();
    const productId = searchParams.get('id') 
    const { data: selectedProductResponse, isLoading } = useQuery({
        queryKey: ['products', productId],
        queryFn: async () => await ProductsService.getById(productId)
    })
    const { mutateAsync: createProductService } = useMutation({
        mutationFn: async payload => await ProductsService.create(payload)
    })
    const { mutateAsync: updateProductService } = useMutation({
        mutationFn: async ({ id, payload }) => await ProductsService.update(id, payload)
    })
    const { register, reset, formState: { errors }, handleSubmit } = useForm({
        resolver: yupResolver(productFormValidationSchema),
        values: selectedProductResponse?.[0],
        criteriaMode: 'all',
    })
    const isEditForm = selectedProductResponse?.length > 0

    const onSubmitHandler = handleSubmit(async payload => {
        if (isEditForm) {
            await updateProductService({
                id: payload.id,
                payload
            }, {
                onSuccess: response => {
                    toast.success('Porduct updated successfully')
                    queryClient.setQueryData(['products'], oldState => {
                        const filteredState = oldState.filter(o => o.id !== response.id)
                        return [
                            response,
                            ...filteredState
                        ]
                    })
                    navigate(appRoutes.products.list)
                }
            })
            reset(productInitState.selectedProduct)
        } else {
            await createProductService(omit(payload, ["id"]), {
                onSuccess: response => {
                    toast.success('Porduct created successfully')
                    queryClient.setQueryData(['products'], oldState => {
                        return [
                            response,
                            ...oldState,
                        ]
                    })
                    navigate(appRoutes.products.list)
                },
                onError: () => {
                    toast.error('Porduct failed to created')
                },
            })
            reset()
        }
        
    })

    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Loader />
            </div>
        )
    }

    return (
        <form className="product-form-container" onSubmit={onSubmitHandler}>
            <p className="product-form-container-header-title">
                {isEditForm ? 'Update' : 'Create'} a new Product
            </p>
            <div className='product-form-container-control'>
                <input
                    className="product-form-container-title"
                    placeholder="Add title..."
                    {...register('title')}
                />
                {Boolean(errors.title?.message) && <p style={{ color: 'red' }}>{errors.title?.message}</p>}
            </div>
            <div className='product-form-container-control'>
                <input
                    className="product-form-container-price"
                    placeholder="Add price..."
                    {...register('price')}
                />
                {Boolean(errors.price?.message) && <p style={{ color: 'red' }}>{errors.price?.message}</p>}
            </div>
            <div className='product-form-container-control'>
                <input
                    className="product-form-container-img-url"
                    placeholder="Add image url..."
                    {...register('img')}
                />
                {Boolean(errors.img?.message) && <p style={{ color: 'red' }}>{errors.img?.message}</p>}
            </div>
            <button className="product-form-container-button">Submit</button>
        </form>
    )
}