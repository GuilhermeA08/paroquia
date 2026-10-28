# Paróquia de Sant’Ana — Campo Grande/RN

Site da paróquia em Next.js, publicado na Vercel. Cada push na `main` publica o site.

## Desenvolvimento

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # confere se o site compila
npm run format     # formata com bun fmt (também roda no pre-commit)
```

## Onde ficam os dados

- `src/lib/data.ts` — paróquia, horários de missa, história, padres, galeria, Pix.
- `content/noticias/*.md` — notícias, editadas pelo painel (abaixo).
- `materiais/` — arquivos originais recebidos (logos, QR code) antes de irem para o site.

## Painel de notícias (`/admin`)

A secretaria entra com uma senha e cadastra, edita ou apaga notícias. Cada gravação
vira um commit na `main` pela API do GitHub, e a Vercel publica o site em cerca de 1 minuto.

### Configuração (uma vez)

1. **Senha:** rode `npm run admin:senha`, digite a senha (mínimo de 12 caracteres) e
   copie as duas linhas geradas, `ADMIN_SENHA_HASH` e `ADMIN_SESSAO_SEGREDO`.
   A senha nunca é guardada, só o hash scrypt.
2. **Token do GitHub:** em GitHub → Settings → Developer settings → Personal access tokens →
   **Fine-grained tokens**, gere um token com:
   - Repository access: **Only select repositories** → `paroquia`
   - Permissions → Repository → **Contents: Read and write**
3. **Vercel:** em Settings → Environment Variables, cadastre `ADMIN_SENHA_HASH`,
   `ADMIN_SESSAO_SEGREDO` e `GITHUB_TOKEN`, e faça um redeploy.

Para trocar a senha, rode o passo 1 de novo e atualize `ADMIN_SENHA_HASH`; as sessões
abertas são encerradas. O token do GitHub expira na data escolhida ao criá-lo: renove antes.

### Segurança

- Sessão em cookie assinado (HMAC), `httpOnly`, `secure`, `sameSite=strict`, válida por 8 horas.
- Após 5 senhas erradas, o IP fica bloqueado por 15 minutos.
- O token do GitHub fica só no servidor e só tem acesso a este repositório.
- O texto das notícias não aceita HTML nem links `javascript:`; fotos são reduzidas e
  perdem os metadados (GPS) antes de serem salvas.
