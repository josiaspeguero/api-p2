import { connection } from "../db/db.js";
import { Router } from "express";

const router = Router();
router.get("/", async (req, res) => {
  const result = await connection.execute("SELECT * FROM Agenda");
  res.json(result)
});

router.post("/", async (req, res) => {
    const { nombre, apellido, fecha_nacimiento, direccion, genero, estado_civil, movil, telefono, correo_electronico } = req.body;

    // Validación básica de los datos recibidos
    if (!nombre || !apellido || !fecha_nacimiento || !genero || !estado_civil || !correo_electronico) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    try {
        const query = `
            INSERT INTO Agenda (nombre, apellido, fecha_nacimiento, direccion, genero, estado_civil, movil, telefono, correo_electronico)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const params = [nombre, apellido, fecha_nacimiento, direccion, genero, estado_civil, movil, telefono, correo_electronico];

        // Ejecutar la consulta de inserción
        await connection.execute(query, params);

        // Responder con éxito
        res.status(201).json({ message: 'Registro insertado exitosamente' });
    } catch (error) {
        // Manejo de errores
        console.error(error);
        res.status(500).json({ error: 'Error al insertar el registro' });
    }
});


router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, fecha_nacimiento, direccion, genero, estado_civil, movil, telefono, correo_electronico } = req.body;
  
    try {
      // Actualizar el registro en la base de datos usando el cliente connection (con execute)
      const result = await connection.execute(
        `UPDATE Agenda 
         SET nombre = ?, apellido = ?, fecha_nacimiento = ?, direccion = ?, genero = ?, estado_civil = ?, movil = ?, telefono = ?, correo_electronico = ? 
         WHERE id = ?`,
        [nombre, apellido, fecha_nacimiento, direccion, genero, estado_civil, movil, telefono, correo_electronico, id]
      );
  
      // Verificar si la actualización fue exitosa
      if (result.rowCount === 0) {
        return res.status(404).json({ message: "No se encontró el registro con ese id." });
      }
  
      return res.status(200).json({ message: "Registro actualizado correctamente." });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error al actualizar el registro." });
    }
  });

  

  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      // Eliminar el registro en la base de datos usando el cliente connection (con execute)
      const result = await connection.execute(
        `DELETE FROM Agenda WHERE id = ?`,
        [id]
      );
  
      // Verificar si la eliminación fue exitosa
      if (result.rowCount === 0) {
        return res.status(404).json({ message: "No se encontró el registro con ese id." });
      }
  
      return res.status(200).json({ message: "Registro eliminado correctamente." });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error al eliminar el registro." });
    }
  });
  
  
export default router;
