import React from "react";
import GroupsIcon from "@mui/icons-material/Groups";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import ReplayIcon from "@mui/icons-material/Replay";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const stats = [
  {
    icon: <GroupsIcon sx={{ fontSize: 32 }} />,
    value: "10.5k",
    label: "Sellers active our site",
  },
  {
    icon: <AttachMoneyIcon sx={{ fontSize: 32 }} />,
    value: "33k",
    label: "Monthly Product Sale",
    highlight: true,
  },
  {
    icon: <ShoppingBagOutlinedIcon sx={{ fontSize: 32 }} />,
    value: "45.5k",
    label: "Customer active in our site",
  },
  {
    icon: <TrendingUpIcon sx={{ fontSize: 32 }} />,
    value: "25k",
    label: "Annual gross sale in our site",
  },
];

const team = [
  {
    name: "Tom Cruise",
    title: "Founder & Chairman",
    img: "/images/about-people/about-people-1.png",
    socials: [
      { icon: <FacebookIcon />, link: "#" },
      { icon: <TwitterIcon />, link: "#" },
      { icon: <LinkedInIcon />, link: "#" },
    ],
  },
  {
    name: "Emma Watson",
    title: "Managing Director",
    img: "/images/about-people/about-people-2.png",
    socials: [
      { icon: <FacebookIcon />, link: "#" },
      { icon: <TwitterIcon />, link: "#" },
      { icon: <LinkedInIcon />, link: "#" },
    ],
  },
  {
    name: "Will Smith",
    title: "Product Designer",
    img: "/images/about-people/about-people-3.png",
    socials: [
      { icon: <FacebookIcon />, link: "#" },
      { icon: <TwitterIcon />, link: "#" },
      { icon: <LinkedInIcon />, link: "#" },
    ],
  },
];

const features = [
  {
    icon: <LocalShippingOutlinedIcon sx={{ fontSize: 32 }} />,
    title: "FREE AND FAST DELIVERY",
    desc: "Free delivery for all orders over $140",
  },
  {
    icon: <SupportAgentIcon sx={{ fontSize: 32 }} />,
    title: "24/7 CUSTOMER SERVICE",
    desc: "Friendly 24/7 customer support",
  },
  {
    icon: <ReplayIcon sx={{ fontSize: 32 }} />,
    title: "MONEY BACK GUARANTEE",
    desc: "We return money within 30 days",
  },
];

export default function AboutPage() {
  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 16px 0 16px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 32 }}>
          <div style={{ flex: "1 1 350px", minWidth: 300 }}>
            <h1 style={{ fontSize: "2.5rem", fontWeight: 600, marginBottom: 24 }}>Our Story</h1>
            <p style={{ fontSize: 17, color: "#333", marginBottom: 16 }}>
              Launched in 2015, Exclusive is South Asia’s premier online shopping marketplace with an active presence in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sellers and 300 brands and serves 3 million customers across the region.
            </p>
            <p style={{ fontSize: 17, color: "#333" }}>
              Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assortment in categories ranging from consumer.
            </p>
          </div>
          <div style={{ flex: "1 1 350px", minWidth: 300, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <img
              src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&w=400"
              alt="Shopping"
              style={{ width: "100%", maxWidth: 350, borderRadius: 12, objectFit: "cover" }}
            />
          </div>
        </div>

        <div style={{ display: "flex", gap: 24, marginTop: 48, justifyContent: "center", flexWrap: "wrap" }}>
          {stats.map((stat) => (
            <div
              key={stat.label}
              style={{
                background: stat.highlight ? "#DB4444" : "#fff",
                color: stat.highlight ? "#fff" : "#000",
                border: stat.highlight ? "none" : "1.5px solid #ddd",
                borderRadius: 8,
                minWidth: 170,
                padding: "28px 18px",
                textAlign: "center",
                boxShadow: stat.highlight ? "0 2px 8px rgba(219,68,68,0.08)" : "none",
                transition: "box-shadow 0.2s",
              }}
            >
              <div style={{ marginBottom: 12 }}>{stat.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 24, marginBottom: 4 }}>{stat.value}</div>
              <div style={{ fontSize: 15 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 56 }}>
          <div style={{ display: "flex", gap: 32, justifyContent: "center", flexWrap: "wrap" }}>
            {team.map((member) => (
              <div key={member.name} style={{ color: "#000", background: "#fff", borderRadius: 12, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", width: 240, textAlign: "center", padding: "0 0 24px 0" }}>
                <img
                  src={member.img}
                  alt={member.name}
                  style={{
                    width: "100%",
                    height: 220,
                    objectFit: "cover",
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                  }}
                />
                <div style={{ fontWeight: 600, fontSize: 18, marginTop: 18 }}>{member.name}</div>
                <div style={{ color: "#888", fontSize: 15, marginBottom: 10 }}>{member.title}</div>
                <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
                  {member.socials.map((s, i) => (
                    <a key={i} href={s.link} style={{ color: "#222", display: "inline-flex" }}>
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: 8, margin: "18px 0 0 0" }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#DB4444", display: "inline-block" }}></span>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ddd", display: "inline-block" }}></span>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ddd", display: "inline-block" }}></span>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ddd", display: "inline-block" }}></span>
          </div>
        </div>

        <div style={{ display: "flex", gap: 32, justifyContent: "center", marginTop: 56, paddingBottom: 56, flexWrap: "wrap" }}>
          {features.map((f) => (
            <div key={f.title} style={{ background: "#fff", borderRadius: 12, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", minWidth: 260, textAlign: "center", padding: "32px 18px" }}>
              <div style={{ marginBottom: 16 }}>{f.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{f.title}</div>
              <div style={{ color: "#888", fontSize: 15 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
