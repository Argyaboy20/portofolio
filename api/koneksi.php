<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization');
header('Content-Type: application/json; charset=UTF-8');

include "db_porto.php";

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

$postjson = json_decode(file_get_contents('php://input'), true);
$aksi = isset($postjson['aksi']) ? strip_tags($postjson['aksi']) : '';
$response = array('success' => false, 'message' => 'Invalid request');

if ($aksi == "add_connect") {
    try {
        if (empty($postjson['nama']) || empty($postjson['email']) || empty($postjson['pesan'])) {
            throw new Exception('Semua field harus diisi');
        }

        $nama = filter_var($postjson['nama'], FILTER_SANITIZE_STRING);
        $email = filter_var($postjson['email'], FILTER_SANITIZE_EMAIL);
        
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new Exception('Format email tidak valid');
        }
        
        $pesan = filter_var($postjson['pesan'], FILTER_SANITIZE_STRING);

        $sql = "INSERT INTO connect (nama, email, pesan) VALUES (:nama, :email, :pesan)";
        $stmt = $pdo->prepare($sql);

        $stmt->bindParam(':nama', $nama, PDO::PARAM_STR);
        $stmt->bindParam(':email', $email, PDO::PARAM_STR);
        $stmt->bindParam(':pesan', $pesan, PDO::PARAM_STR);

        if ($stmt->execute()) {
            $response = array(
                'success' => true,
                'message' => 'Pesan berhasil terkirim'
            );
        } else {
            throw new Exception('Gagal mengirim pesan');
        }
    } catch (Exception $e) {
        $response = array(
            'success' => false,
            'message' => $e->getMessage()
        );
    }
}

// Make sure no extra whitespace or characters are output
ob_clean();
echo json_encode($response);
exit;