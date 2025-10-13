import React from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { contactFormSchemaValidation } from './config';



export default function ContactPage() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(contactFormSchemaValidation)
  });

  const [showCta, setShowCta] = React.useState(false);

  const onSubmit = handleSubmit(() => {
    setShowCta(true);
    reset();
  });

  return (
    <div style={{ background: "#fafafa", minHeight: "100vh", padding: "40px 0" }}>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          gap: 32,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {/* Contact Info */}
        <div
          style={{
            background: "#fff",
            borderRadius: 10,
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
            padding: "32px 28px",
            minWidth: 300,
            maxWidth: 340,
            flex: "1 1 320px",
            display: "flex",
            flexDirection: "column",
            gap: 32,
            height: "100%",
          }}
        >
          {/* Call To Us */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
            <div
              style={{
                background: "#DB4444",
                borderRadius: "50%",
                width: 48,
                height: 48,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: 24,
              }}
            >
              <i className="fa fa-phone"></i>
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 6 }}>
                Call To Us
              </div>
              <div style={{ color: "#555", fontSize: 15, marginBottom: 6 }}>
                We are available 24/7, 7 days a week.
              </div>
              <div style={{ color: "#555", fontSize: 15 }}>
                Phone: +8801611112222
              </div>
            </div>
          </div>
          <hr style={{ border: "none", borderTop: "1px solid #eee", margin: "0 0 0 0" }} />
          {/* Write To Us */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
            <div
              style={{
                background: "#DB4444",
                borderRadius: "50%",
                width: 48,
                height: 48,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: 24,
              }}
            >
              <i className="fa fa-envelope"></i>
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 6 }}>
                Write To US
              </div>
              <div style={{ color: "#555", fontSize: 15, marginBottom: 6 }}>
                Fill out our form and we will contact you within 24 hours.
              </div>
              <div style={{ color: "#555", fontSize: 15 }}>
                Emails: customer@exclusive.com
              </div>
              <div style={{ color: "#555", fontSize: 15 }}>
                Emails: support@exclusive.com
              </div>
            </div>
          </div>
        </div>
        {/* Contact Form */}
        <div
          style={{
            background: "#fff",
            borderRadius: 10,
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
            padding: "32px 28px",
            minWidth: 340,
            flex: "2 1 480px",
            maxWidth: 700,
          }}
        >
          <form onSubmit={onSubmit} noValidate>
            <div
              style={{
                display: "flex",
                gap: 16,
                marginBottom: 16,
                flexWrap: "wrap",
              }}
            >
              <input
                type="text"
                placeholder="Your Name *"
                {...register('name')}
                style={{
                  flex: "1 1 180px",
                  minWidth: 160,
                  background: "#f5f5f5",
                  border: "none",
                  borderRadius: 6,
                  padding: "14px 16px",
                  fontSize: 16,
                  marginBottom: 0,
                  outline: "none",
                }}
              />
              {errors.name?.message ? (<div style={{ color: 'red', fontSize: 12, marginTop: 4 }}>{errors.name.message}</div>) : null}
              <input
                type="email"
                placeholder="Your Email *"
                {...register('email')}
                style={{
                  flex: "1 1 180px",
                  minWidth: 160,
                  background: "#f5f5f5",
                  border: "none",
                  borderRadius: 6,
                  padding: "14px 16px",
                  fontSize: 16,
                  marginBottom: 0,
                  outline: "none",
                }}
              />
              {errors.email?.message ? (<div style={{ color: 'red', fontSize: 12, marginTop: 4 }}>{errors.email.message}</div>) : null}
              <input
                type="tel"
                placeholder="Your Phone *"
                {...register('phone')}
                style={{
                  flex: "1 1 180px",
                  minWidth: 160,
                  background: "#f5f5f5",
                  border: "none",
                  borderRadius: 6,
                  padding: "14px 16px",
                  fontSize: 16,
                  marginBottom: 0,
                  outline: "none",
                }}
              />
              {errors.phone?.message ? (<div style={{ color: 'red', fontSize: 12, marginTop: 4 }}>{errors.phone.message}</div>) : null}
            </div>
            <textarea
              placeholder="Your Massage"
              rows={6}
              {...register('message')}
              style={{
                width: "100%",
                background: "#f5f5f5",
                border: "none",
                borderRadius: 6,
                padding: "14px 16px",
                fontSize: 16,
                marginBottom: 24,
                outline: "none",
                resize: "vertical",
              }}
            />
            {errors.message?.message ? (<div style={{ color: 'red', fontSize: 12, marginTop: 4 }}>{errors.message.message}</div>) : null}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: 'center' }}>
              {showCta ? (
                <a href="/" style={{ textDecoration: 'underline', color: '#222' }}>Go back to Home</a>
              ) : <span />}
              <button
                type="submit"
                style={{
                  background: "#DB4444",
                  color: "#fff",
                  border: "none",
                  borderRadius: 6,
                  padding: "14px 36px",
                  fontSize: 16,
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
              >
                Send Massage
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

}