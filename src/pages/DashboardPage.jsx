import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Modal, Form } from "react-bootstrap";
import { Toast, ToastContainer } from "react-bootstrap";
import { toast } from "sonner";

const DashboardPage = () => {
    const navigate = useNavigate();
    const [reservationCount, setReservationCount] = useState(0);
    const [reservations, setReservations] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [reservationData, setReservationData] = useState({
        id: null,
        namaPemesan: "",
        statusReservasi: "",
        tanggalReservasi: "",
        jumlahOrang: "",
        nomorMeja: "",
        abjad: "",
    });
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            navigate("/login");
        }
    }, [navigate]);

    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setReservationData({
            ...reservationData,
            [name]: value,
        });

        if (name === "statusReservasi") {
            if (value === "Pending") {
                setReservationData((prev) => ({
                    ...prev,
                    nomorMeja: "Menunggu konfirmasi",
                    abjad: "",
                }));
            } else if (value === "Cancelled") {
                setReservationData((prev) => ({
                    ...prev,
                    nomorMeja: "Reservasi dibatalkan",
                    abjad: "",
                }));
            } else {
                setReservationData((prev) => ({
                    ...prev,
                    nomorMeja: "",
                    abjad: "",
                }));
            }
        }
    };

    const formatDate = (date) => {
        const options = {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        };
        return new Intl.DateTimeFormat("id-ID", options).format(new Date(date));
    };

    const handleSaveReservation = () => {
        const isFormIncomplete =
            !reservationData.namaPemesan ||
            !reservationData.statusReservasi ||
            !reservationData.tanggalReservasi || 
            !reservationData.jumlahOrang;

        if (isFormIncomplete) {
            alert("Semua data wajib diisi!");
            return;
        }

        if (editMode) {
            setReservations((prev) =>
                prev.map((res) =>
                    res.id === reservationData.id ? { ...reservationData } : res
                )
            );
        } else {
            setReservations([
                ...reservations,
                { ...reservationData, id: reservations.length + 1 },
                
            ]);
            setReservationCount(reservations.length + 1);
            setToastMessage(`Berhasil Tambah Data ${reservationData.namaPemesan}!`);
            setShowToast(true);
        }

        resetForm();
    };

    const handleEditReservation = (reservation) => {
        setEditMode(true);
        setReservationData({ ...reservation });
        setShowModal(true);
    };

    const handleDeleteReservation = (id) => {
        setReservations((prev) => prev.filter((res) => res.id !== id));
        setReservationCount((prev) => prev - 1);
    };

    const resetForm = () => {
        setReservationData({
            id: null,
            namaPemesan: "",
            statusReservasi: "",
            tanggalReservasi: "",
            jumlahOrang: "",
            nomorMeja: "",
            abjad: "",
        });
        setShowModal(false);
        setEditMode(false);
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case "Pending":
                return "bg-warning text-dark";
            case "Confirmed":
                return "bg-success";
            case "Cancelled":
                return "bg-danger";
            default:
                return "bg-secondary";
        }
    };

    return (
        <Container className="mt-5">
            <h1 className="mb-3 border-bottom fw-bold">Dashboard</h1>
            <ToastContainer position="top-center" className="p-3">
                <Toast
                    bg="success"
                    show={showToast}
                    autohide
                    delay={3000}
                    onClose={() => setShowToast(false)}
                >
                    <Toast.Body className="text-white">{toastMessage}</Toast.Body>
                </Toast>
            </ToastContainer>

            <Row className="mb-4">
                <Col md={10}>
                    <Card className="h-100 justify-content-center">
                        <Card.Body>
                            <h4>Selamat datang,</h4>
                            <h1 className="fw-bold display-6 mb-3">{user?.username}</h1>
                            <p className="mb-0">Kamu sudah login sejak:</p>
                            <p className="fw-bold lead mb-0">{formatDate(user?.loginAt)}</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={2}>
                <Card>
                    <Card.Body>
                        <p>Bukti Sedang ngantor:</p>
                        <img src="https://via.placeholder.com/150" className= "img-fluid rounded" alt="Tidak Ada Gambar" />
                    </Card.Body>
                </Card>
                </Col>
            </Row>

            <h2 className="mb-3 border-bottom fw-bold">Daftar Reservasi Meja</h2>
            <Row className="mb-4">
                <Col md={10}>
                    <p className="mb-0">
                        Saat ini terdapat <strong>{reservationCount}</strong> reservasi meja.
                    </p>
                    <p></p>
                    <Button variant="success" onClick={() => setShowModal(true)}>
                        Tambah Reservasi Meja
                    </Button>
                </Col>
            </Row>

            <Row className="g-4">
                {reservations.map((reservation) => (
                    <Col md={4} key={reservation.id}>
                        <Card className="border-primary h-100">
                            <Card.Header className="bg-primary text-white">
                                {reservation.namaPemesan}
                            </Card.Header>
                            <Card.Body>
                                <p><strong>Jumlah Orang:</strong> {reservation.jumlahOrang}</p>
                                <p><strong>Tanggal & Waktu:</strong> {formatDate(reservation.tanggalReservasi)}</p>
                                <p>
                                    <strong>Status:</strong>{" "}
                                    <span className={`badge ${getStatusBadge(reservation.statusReservasi)}`}>
                                        {reservation.statusReservasi}
                                    </span>
                                </p>
                                <Row>
                                    <Col md={6}>
                                        <p><strong>Nomor Meja:</strong> {reservation.nomorMeja || "Menunggu konfirmasi"}</p>
                                    </Col>
                                    {reservation.statusReservasi === "Confirmed" && (
                                        <Col md={6}>
                                            <p><strong>Abjad:</strong> {reservation.abjad}</p>
                                        </Col>
                                    )}
                                </Row>
                            </Card.Body>
                            <Card.Footer className="d-flex justify-content-between">
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handleDeleteReservation(reservation.id)}
                                >
                                    Hapus
                                </Button>
                                <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={() => handleEditReservation(reservation)}
                                >
                                    Edit
                                </Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Modal show={showModal} onHide={resetForm}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {editMode ? "Edit Reservasi Meja" : "Tambah Reservasi Meja"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formNamaPemesan">
                            <Form.Label>Nama Pemesan</Form.Label>
                            <Form.Control
                                type="text"
                                name="namaPemesan"
                                placeholder="Nama Pemesan"
                                value={reservationData.namaPemesan}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formStatusReservasi">
                            <Form.Label>Status Reservasi</Form.Label>
                            <Form.Control
                                as="select"
                                name="statusReservasi"
                                value={reservationData.statusReservasi}
                                onChange={handleInputChange}
                            >
                                <option value="">Pilih Status</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Pending">Pending</option>
                                <option value="Cancelled">Cancelled</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formTanggalReservasi">
                            <Form.Label>Tanggal dan Waktu Reservasi</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                name="tanggalReservasi"
                                value={reservationData.tanggalReservasi}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formJumlahOrang">
                            <Form.Label>Jumlah Orang</Form.Label>
                            <Form.Control
                                type="number"
                                name="jumlahOrang"
                                placeholder="Jumlah Orang"
                                value={reservationData.jumlahOrang}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        {reservationData.statusReservasi === "Confirmed" && (
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="formNomorMeja">
                                        <Form.Label>Nomor Meja</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="nomorMeja"
                                            placeholder="Nomor Meja"
                                            value={reservationData.nomorMeja}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="formAbjad">
                                        <Form.Label>Abjad</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="abjad"
                                            placeholder="Abjad"
                                            value={reservationData.abjad}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        )}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={resetForm}>
                        Batal
                    </Button>
                    <Button variant="primary" onClick={handleSaveReservation}>
                        Simpan
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default DashboardPage;
