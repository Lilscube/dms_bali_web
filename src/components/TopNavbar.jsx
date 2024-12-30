import React from "react";
// Hapus import yang tidak diperlukan
// import { useNavigate, useLocation } from "react-router-dom";
// import { Navbar, Container, Nav, Button } from "react-bootstrap";
// import { toast } from "sonner";
import imgLogo from "../assets/images/logo.png";

const LandingPage = () => {
    return (
        <div style={{ textAlign: "center", padding: "50px" }}>
            <h1>Selamat Datang di Website Kami!</h1>
            <p>Temukan informasi terbaru dan layanan terbaik kami.</p>
            <img
                src="path/to/your/image.jpg" // Ganti dengan path gambar yang sesuai
                alt="Deskripsi Gambar"
                style={{ width: "300px", height: "auto", marginBottom: "20px" }}
            />
            <button 
                onClick={() => alert("Tombol CTA Ditekan!")} 
                style={{ padding: "10px 20px", fontSize: "16px" }}
            >
                Pelajari Lebih Lanjut
            </button>
        </div>
    );
};

export default LandingPage;