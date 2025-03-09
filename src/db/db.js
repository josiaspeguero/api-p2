import { createClient } from "@libsql/client";

export const connection = createClient({
    url: "libsql://contact-tursotest56.turso.io",
    authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NDE1NTY0NDgsImlkIjoiMjMwNGQ0M2EtNGI2My00ZDRkLTk0YjgtOWRhNDViNzNlNThmIn0.k7RhnRA_4275Poq0ILmVLbjBxjeW8IrM0rXVRZhNHER1LLX0yp3Uk7k2QHSoleDV8icOns1phkrilT9bnwi2BA"
})