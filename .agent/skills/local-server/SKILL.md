---
name: local-server
description: Use when you need to start a local development server, view the site locally, provide a localhost URL, or when the user wants to preview their work. Handles port conflicts automatically.
---

# Skill: Local Server

Servidor de desenvolvimento local usando Netlify Dev.

---

## REGRA ABSOLUTA: Apenas Netlify Dev

**NUNCA** use alternativas como `python -m http.server`, `npx serve`, etc.

O Netlify Dev é obrigatório porque:
- CDN de imagens (`/.netlify/images`) só funciona com ele
- Simula redirects do netlify.toml
- Testa formulários Netlify
- Mostra o site EXATAMENTE como vai ao ar

---

## Processo (SEMPRE seguir)

### 1. Verificar se já existe servidor ativo nesta porta (Windows)

Como o sistema é Windows, o comando `lsof` não funciona. Em vez disso, verifique as portas usadas:

```powershell
netstat -ano | findstr :8888
netstat -ano | findstr :8889
```

Se houver uma porta ocupada, o comando retornará algo como:
`TCP  0.0.0.0:8888  0.0.0.0:0  LISTENING  [PID]`

**Se encontrar um processo travado ou erro ERR_CONNECTION_REFUSED / "Could not acquire port":**
Force o encerramento do processo usando o PID retornado no comando acima:
```powershell
taskkill /PID [ColoqueOPIDAqui] /F
```
Se não conseguir identificar se é desta pasta ou de outra, e o erro persistir, apenas mate o processo na porta e inicie um novo servidor para a pasta atual.

### 2. Se NÃO houver servidor desta pasta

Verifique quais portas estão ocupadas e escolha o primeiro par livre:

- 8888 / 3999
- 8889 / 4000
- 8890 / 4001
- 8891 / 4002
- 8892 / 4003

### 3. Iniciar o servidor

```bash
netlify dev --port {PRINCIPAL} --functions-port {FUNCOES}
```

---

## Resumo do Fluxo

```
1. Verificar processos node nas portas 8888-8892 e 3999-4003
   │
   ├── Encontrou processo?
   │   │
   │   ├── É desta pasta? → Informar link existente, NÃO criar novo
   │   │
   │   └── É de outra pasta? → Escolher próximo par de portas livre
   │
   └── Nenhum processo? → Usar portas padrão 8888/3999

2. Iniciar servidor (se necessário)

3. Informar URL ao usuário
```

---

## Troubleshooting

### netlify: command not found

```bash
npm install -g netlify-cli
```

### Servidor não atualiza

Cache do navegador. Hard refresh:
- Mac: `Cmd+Shift+R`
- Windows: `Ctrl+Shift+R`

---

## Ao Finalizar

Informe a URL ao usuário:

> "Servidor iniciado. Acesse: http://localhost:{PORTA}"

Ou se já existia:

> "Servidor já está rodando. Acesse: http://localhost:{PORTA}"

Após fornecer o link:
1. Aguarde o usuário visualizar
2. **PARE COMPLETAMENTE E AGUARDE**

**NUNCA** continue para outras etapas automaticamente.
