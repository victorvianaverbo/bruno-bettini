# Especificação de Layout: Mentoria de Palestrantes - Alto Valor

**Linguagem Visual Geral**
- **Cores Principais:** Background Light (`#EAECEF`, `#F4F6F8`, `#FFFFFF`), Text (`#42454A`, `#111315`), Accent Orange (`#E05A00`).
- **Tipografia:** `DM Serif Display` (Heading - Clássico/Autoritário) + `DM Sans` (Body - Clean/Alta legibilidade).
- **Vibe:** Elegante, Premium, Direto ao ponto, Alta conversão.

---

## Seção 1: Hero

### Arquétipo e Constraints
- **Arquétipo:** Spotlight (Elemento central focado) + Contained Center.
- **Constraints:** Noise Texture (Textura granulada sutil baseada em SVG), Mouse Spotlight (Luz dinâmica que segue o cursor).
- **Justificativa:** Essa arquitetura afunila a atenção do usuário para a promessa central de alto valor. O efeito dinâmico do spotlight recompensa o engajamento com o mouse, transmitindo sofisticação técnica imediata.

### Conteúdo
- **Badge:** Mentoria Exclusiva
- **Headline:** Transforme Sua Expertise em uma Carreira de Palestrante de Alto Valor ("Palestrante de Alto Valor" em destaque).
- **Subheadline:** Descubra o método usado pelos palestrantes mais bem pagos do mercado e aprenda a transformar seu conhecimento em um negócio lucrativo e de alto impacto.
- **CTA:** APLICAR PARA A SELEÇÃO

### Layout
- Section ocupando a tela toda (min-height `100vh`), display em `flex`, com todos os itens centralizados e alinhados num container virtual (max-width `900px`).
- Margem inferior no subheadline de `3rem` separando vigorosamente o CTA.
- Top padding de `5rem` para acomodar a navbar superior absolute.

### Tipografia
- **Badge:** `0.75rem` (`12px`), text-transform uppercase, letter-spacing `0.1em`.
- **Headline:** Tamanho auto-escalável brutalista `clamp(2.5rem, 5vw + 1rem, 5.5rem)`, line-height apertado de `1.1`, peso `400`.
- **Destaque:** O texto na tag `.highlight` recebe `font-style: italic` com cor acentuada primária.
- **Subheadline:** `clamp(1rem, 1.5vw + 0.5rem, 1.25rem)`, peso ultraleve `300`.

### Cores
- Fundo: Root Background `#EAECEF`.
- Noise Overlay global em `opacity: 0.03` com mix-blend-mode na posição fixa e pointer-events none para não atrapalhar clicks.
- Destaque "Palestrante de Alto Valor": `#E05A00`.
- CTA Background: `#E05A00` que sobe no hover para `#C24E00`.

### Elementos Visuais
- **Spotlight Background:** Div absoluta, index negativo (`z-index: 1`), contendo `radial-gradient(circle 800px at 50% 0%, rgba(255, 255, 255, 0.5), transparent 70%)`.
- **Glow no Título:** Pseudo-elemento (::after) no highlight, posicionado no base line (-5% bottom), injetando brilho laranja em opacidade 0.1 e forte blur de `15px`.
- **Botão Hero (Primary):** Sem borda, `padding: 1.25rem 2.5rem`, sombra padrão elegante `0 4px 15px rgba(224,90,0,0.2)`.

### Animações
- Destaque sutil de Hover pseudo-element no fundo do botão com gradação semi-translúcida (`rgba(255, 255, 255, 0.1)`) subindo em fade over de duração `0.2s ease`.

### Interatividade
- **Spotlight Seguidor:** Quando o usuário move o mouse dentro do Hero, o `radial-gradient` acompanha perfeitamente a posição relativa (x, y) reduzindo o raio do círculo para foco (`600px`).

### Responsividade
- `< 768px`: Todo o conteúdo flex muda a orientação de text-align center para **text-align left**; padding-top engole e o badge se alinha na margem de guia.

---

## Seção 2: O Problema

### Arquétipo e Constraints
- **Arquétipo:** Bento Box / Modular Grid.
- **Constraints:** Hover Lift (Levanta no hover), Hover Underline (Preenchimento expansivo no topo da carta).
- **Justificativa:** Essa diagramação retangular encapsula perfeitamente queixas/dores comuns em blocos isolados hiper-simétricos que garantem alto escaneamento cognitivo para quem vai só saltar na página.

### Conteúdo
[Fiel ao copy.md]
- **Header Section:** Você passou anos construindo uma carreira sólida... e a premissa de falta de método.
- **Intro:** Muitos grandes especialistas... travam nesses 3 motivos:
- **01.** Posicionamento Vago (Não sabem se vender como autoridade)
- **02.** Produto Inexistente (Não possuem palestra estruturada comercialmente)
- **03.** Insegurança Comercial (Bloqueio ao precificar/negociar)
- **Bottom:** O resultado? Você continua esperando... e não valoriza seu potencial.

### Layout
- Container limitador de Title para `800px` (centralizado na seção do topo) e context copy para max `900px`.
- Os cartões dividem um contêiner `grid`, responsivo pelo auto-fit usando colunas base de no mínimo `280px`.
- Gap rígido entre cartas de `1.5rem`.
- Padding robusto na seção limitando espaços verticais: `var(--space-xl) = 8rem` padding em Y.

### Tipografia
- Título majestoso do problema: `clamp(2rem, 3.5vw, 3.5rem)`, line-height `1.2`.
- Numeração Absoluta das cartas: `2.5rem`, `DM Serif Display`, linha perfeitamente colada de height `1`.
- Título da Objeção: `1.25rem`, cor `#111315`.

### Cores
- Fundo principal adota o alternate bg `#F4F6F8` contrastando de leve do light grey superior.
- Numeral do card (`01, 02, etc.`) recebe `rgba(0,0,0,0.08)` para fazer mescla visual profunda com o off-white surface do fundo da própria carta.

### Elementos Visuais e Interatividade
- **Borda mágica Bento Card:** Box ganha `transform: translateY(-5px)` imediato de `.4s cubic-bezier`.
- Ao entrar em hover, ocorre uma expansão linear-X do topo da carta (100% de width, `3px` height, `#E05A00`), simulando revelação. A caixa recebe novo cast de box-shadow `0 10px 30px rgba(0,0,0,0.05)`.
- O Box de rodapé (conclusão) leva background `#FFFFFF` fixo em frame bordeado pelo Accent com extrema delicadeza (`1px solid rgba(224, 90, 0, 0.15)`).

### Responsividade
- `< 768px`: Textos são empurrados full esquerdo na alocação horizontal. A caixa murcha pad-sides de `3rem` para `1.5rem`. O tamanho de base flex despenca ajustando em scroll vertical.

---

## Seção 3: A Solução

### Arquétipo e Constraints
- **Arquétipo:** Split Vertical com Sticky Element.
- **Constraints:** Glassmorphism Cards, Parallax Reveal On Scroll (AOS base engine).
- **Justificativa:** Manter o Header de "A Solução" estático num pedestal à esquerda cria autoridade editorial massiva, não deixando o pranchão flutuar sozinho na seção ao decorrer do tempo; isso contrasta o peso da leitura do pilar em cards de vidro na coluna solta à direita.

### Conteúdo
[Fiel ao copy.md]
- **Header Left:** Domine o Palco e o Negócio por Trás Dele (Texto base abaixo).
- **Coluna Direita Pilares:** Estruturar, Marca Pessoal, Dominar a Venda e Networking Estratégico.

### Layout
- Grid estrito em 50/50 ratio (`grid-template-columns: 1fr 1fr`).
- Coluna esquerda recebe trigger sticky, flutuando travada em `top: 120px` da calha invisível.
- Coluna dos pilares aplica um gap largo (`3rem`) na stack de flex vertical entre features.
- Fundo volta para coloração base neutra.

### Tipografia
- Monumental Header Left: `clamp(2.5rem, 4vw, 4rem)`.
- Pilares textuais caem com corpo em `1.15rem` de peso normal.

### Elementos Visuais e Animações
- **Glassmorphism:** Os envelopes das soluções recebem `rgba(255, 255, 255, 0.6)` e um background blur real na interface de interface (`backdrop-filter: blur(12px)`), flutuando sobre a raiz da layer.
- **AOS Animate Engine:** Cada card é injetado com fade up e descolamento direcional no delay, criando cascata estagiada de `0ms`, `100ms`, `200ms` e `300ms`, respectivamente por posição de filho de renderização.

### Responsividade
- `< 992px`: O layout grid parte. A funcionalidade Sticky é morta e resetada (`position: relative`), colinas verticais engolem a seção sem perder o Glassmorphism nos cards. Fontes encolhem 15%.

---

## Seção 4: Aplicação (Formulário Estilo Typeform)

### Arquétipo e Constraints
- **Arquétipo:** Modal / Full Screen Overlay (Pop-up tela cheia).
- **Constraints:** Conversational (Interface unifocada), Single Focus (Eliminação de distrações da página).
- **Justificativa:** O formulário não deve poluir a página inicial. O clique no CTA atua como um gatilho para a conversão, abrindo um Modal imersivo de tela cheia que captura a atenção total do usuário, mantendo a mesma identidade visual e elegância premium da landing page principal.

### Conteúdo (Todos os 11 Passos + Telas Finais)
0. (Barra de Progresso no topo).
1. Nome
2. E-mail
3. WhatsApp (com DDD)
4. Link do seu perfil no LinkedIn
5. Qual é a sua principal área de atuação ou nicho de mercado?
6. Qual é seu principal objetivo ao construir uma carreira como palestrante (A - Nova Renda, B - Referência, C - Transição, D - Apenas Compartilhar)?
7. Qual é o tema ou a mensagem central que você acredita que o mercado pagaria caro para ouvir de você?
8. Hoje, o que mais te impede de estar nos palcos corporativos (A - Posicionamento, B - Estrutura, C - Precificação, D - Networking)?
9. Quantas palestras remuneradas você realizou (A - Nenhuma, B - 1-5, C - Mais de 5)?
10. Você está em um momento disposto a investir (A - Sim, B - Depende, C - Apenas oportunidades gratuitas)?
11. Por que você acredita que deveria ser um dos selecionados para receber nosso acompanhamento?
* Finish/Error Screens no Submit nativo de background.

### Layout
- O formulário real deixa de ser uma section estática e passa a ser uma `div` com `position: fixed; inset: 0; z-index: 9999;`, cobrindo 100% da viewport.
- O display padrão do Container do modal é `none` (ou `opacity: 0; pointer-events: none`).
- O trigger será puramente via clique nos CTAs ("APLICAR PARA A SELEÇÃO").
- Toda a interface mantém o Root Background (`#EAECEF` ou `#F4F6F8`), sem a virada agressiva para Black, preservando o tema do Hero e Soluções.
- As steps `.typeform-step` são posicionadas absolutamente no centro da tela (`left:0; width:100%`). Apenas a `.active` é renderizada.

### Tipografia
- Botão "X" para fechar o pop-up (Cancelamento) flutuando no canto superior direito (`2rem` de padding root, clean minimal).
- Identificador de bolha (`Counter` numérico e logo interno circular SVG): Cor laranja principal pura; número colado.
- Pergunta `<h2>`: Font DM Serif majestosa preenchendo a tela em tamanhos grandes e com alto peso; cor de heading primária `#111315`.
- Alternativas/Teclas Base (A,B,C,D): Mono/Sans, tamanho padronizado médio, cor contrastada elegante.

### Cores e Tratamento de Mídia
- Backplate de fundo tela cheia: Herda o ambiente claro, `#F4F6F8`, leve backdrop-blur sobre o body da página.
- Inputs the texto/textarea: `border-bottom: 2px solid rgba(0, 0, 0, 0.2)`. Background zero (transparent). Tipografia principal `#42454A`.
- Alternativas/Choices inativas: Fundo claro (surface hover `rgba(0,0,0,0.02)`) com bordas primárias refinadas cinzas `rgba(0,0,0,0.1)`.
- **Teclas Key** (Hint Box como os 'A, B'): Um tom oposto discreto `rgba(0,0,0,0.05)`.
- Ambient Glow Base: Sem exagero do dark, fundo pode ter um grain overlay unificado das seções anteriores.

### Animações
- **Modal Reveal:** Entrada por fade in total no contêiner mestre fixo (`opacity 0 -> 1`), seguida por scale/translate-up no step inicial.
- **Steps Enter Animation:** Um step entra fazendo a elevação translacional do container do absolute `transform: translateY(3rem)` para `0`, suavizado com easing `0.4s cubic-bezier(0.16, 1, 0.3, 1)`.
- Alternativas Hovering: Ao colocar o mouse, fundo ganha background sutil laranja claro `rgba(224,90,0,0.05)` e a borda colore de Primary Orange. O hover simula uma marcação de seleção premium de múltipla escolha clara.
- Pulse Radial Error: Um `.typeform-error` injetado na DOM surge balançando se uma validação quebrar com cor base estipulada de alerta `#FF4B2B`.

### Interatividade
- **CTA Hero Bind:** Todos `.btn-primary` com `href="#aplicacao"` ativam o gatilho JS para dar `display: flex` no modal e travar o overflow-y document.
- Barra inferior navega o form. O botão 'Next / OK' ganha ícones nativos minimalistas.
- A hint text ("Enter para continuar") simula UX de desktop premium, fazendo o listener `keydown` varrer intercepção pro script de fundo.
- **Integração de Escopo Invisível:** Todo o layout engloba um Formulario base HTML de input hidden submetido ao Netlify Forms no instante assíncrono final que injeta array value do Typeform para um POST transparente (Action setado para obrigado.html base).

### Responsividade
- `< 768px`: A `min-height` da master tag perde margem, baixando para `500px`. O padding some para liberar o imersivo do touch device de mobile. Tamanhos de letra engolem as fontes maiores em scale para comportar caixas verticais altas (como escolhas múltiples segurando linhas duplas). O helper Hint Text Keypress do 'Enter ↵' e atalhos globais de teclado some das visões e desaparece.
