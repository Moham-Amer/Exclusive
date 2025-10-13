
import { useProducts } from '../../../products/hooks/products';
import { useSearchState } from '../../store';
import './style.css';

export function SearchInput() {
    const { value: inputString, setInputString } = useSearchState();
    const { search } = useProducts();

    const handleInputChange = async e => {
        const value = e.target.value
        setInputString({ value })
        await search(value)
    }

    return (
        <div className="search-bar">
            <input 
                type="text"
                id="search-input" 
                placeholder="Plz search.." 
                value={inputString} 
                onChange={handleInputChange} 
            />
            <button id="button-click" className="search-button">
                <img src="/images/search.png" alt="search-icon" width="15" height="15" />
            </button>
        </div>
    );
}
