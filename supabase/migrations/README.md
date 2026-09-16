# supabase/migrations

**Responsable:** Ivan Diaz (base de datos).

Control de versiones del esquema de la base de datos de RentAR (Supabase/Postgres). Cada cambio de
esquema se agrega acá como una migración nueva, generada con la Supabase CLI
(`supabase migration new <nombre>`), nunca editando el esquema a mano en el dashboard.

Vacío por ahora: todavía no hay esquema definido. Se completa a partir del modelo de datos que surja
de `packages/shared-types` (las entidades — propiedad, contrato, pago, etc. — deberían nacer como
tipo TypeScript compartido antes o junto con su tabla).
