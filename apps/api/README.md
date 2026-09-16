# apps/api — Backend RentAR

**Responsables:** Thiago D'Andrea, Camila Carrizo.

**Stack previsto:** Node.js + Express + Swagger (documentación de la API vía OpenAPI).

## Estado actual

Placeholder. Todavía no hay código de servidor acá — este paso del proyecto (migración de la
landing a TypeScript + armado del monorepo) es responsabilidad del frontend y no incluye
implementar Express ni ninguna ruta real.

## Qué va a vivir acá

- El servidor Express que expone la API que hoy consume `apps/web` a través de
  `apps/web/src/services/<modulo>.service.ts` (ver la convención de datos en el `CLAUDE.md` raíz).
- La documentación Swagger/OpenAPI de esos endpoints.
- La integración con Supabase (`supabase/`) para persistencia y autenticación.

## Cómo arrancar (cuando exista código)

```bash
npm run dev --workspace=apps/api
```
