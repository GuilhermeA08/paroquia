# Galeria de fotos

Fotos exibidas em `/galeria`, cadastradas em `galeriaFotos` (`src/lib/data.ts`).

Os originais ficam em `materiais/fotos`. Fotos de iPhone (HEIC) são convertidas para JPEG:

- até 1600 px no lado maior, qualidade 80;
- orientação aplicada e metadados removidos (inclusive localização GPS);
- formato em pé (3:4), que é o recorte usado no grid da galeria.
