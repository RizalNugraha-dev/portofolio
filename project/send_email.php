<?php
$servername = "localhost";  // Nama server database (localhost untuk XAMPP)
$username = "root";         // Nama pengguna database (default untuk XAMPP adalah "root")
$password = "";             // Kata sandi database (kosong untuk XAMPP)
$dbname = "contact_form";   // Nama database yang telah Anda buat

// Membuat koneksi
$conn = new mysqli($servername, $username, $password, $dbname);

// Memeriksa koneksi
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Validasi dan sanitasi data
$name = trim($_POST["name"]);
$email = trim($_POST["email"]);
$message = trim($_POST["message"]);

// Periksa apakah data tidak kosong
if (empty($name) || empty($email) || empty($message)) {
    die("All fields are required.");
}

// Periksa format email yang benar
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    die("Invalid email format.");
}

// Gunakan prepared statement untuk mencegah SQL injection
$stmt = $conn->prepare("INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $name, $email, $message);  // "sss" berarti string (untuk name, email, dan message)

// Eksekusi query
if ($stmt->execute()) {
    echo "Data saved successfully!";
} else {
    echo "Error: " . $stmt->error;
}

// Tutup statement dan koneksi
$stmt->close();
$conn->close();
?>
