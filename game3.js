<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Viste a la Persona con EPP</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            margin-top: 50px;
            background-color: #f4f4f4;
        }
        h1 {
            color: #007bff;
        }
        .container {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin-top: 20px;
        }
        .epp-options {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        .epp-option {
            width: 50px;
            height: 50px;
            cursor: pointer;
        }
        .epp-option img {
            width: 100%;
            height: 100%;
        }
        .person {
            position: relative;
            width: 200px;
            height: 400px;
            background-color: #fff;
            border: 2px solid #007bff;
            border-radius: 10px;
            background-image: url('persona.png'); /* Imagen de la persona */
            background-size: cover;
            background-position: center;
        }
        .epp-item {
            position: absolute;
            cursor: pointer;
            width: 50px;
            height: 50px;
        }
        .epp-item img {
            width: 100%;
            height: 100%;
        }
        .back-button {
            margin-top: 20px;
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            cursor: pointer;
        }
        .back-button:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <h1>Viste a la Persona con EPP</h1>
    <div class="container">
        <!-- Opciones de EPP (imágenes) -->
        <div class="epp-options">
            <div class="epp-option" data-item="casco">
                <img src="casco.png" alt="Casco" class="draggable">
            </div>
            <div class="epp-option" data-item="gafas">
                <img src="gafas.png" alt="Gafas de Seguridad" class="draggable">
            </div>
            <div class="epp-option" data-item="guantes">
                <img src="guantes.png" alt="Guantes" class="draggable">
            </div>
            <div class="epp-option" data-item="chaleco">
                <img src="chaleco.png" alt="Chaleco Reflectivo" class="draggable">
            </div>
            <div class="epp-option" data-item="botas">
                <img src="botas.png" alt="Botas de Seguridad" class="draggable">
            </div>
        </div>
        <!-- Figura humana -->
        <div class="person" id="person">
            <!-- Aquí se colocarán los EPP -->
        </div>
    </div>
    <!-- Botón para volver al index -->
    <button class="back-button" onclick="window.location.href = 'index.html';">Volver al Inicio</button>
    <script src="game3.js"></script>
</body>
</html>
