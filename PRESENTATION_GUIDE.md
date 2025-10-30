# Guia de Apresentação (FasTravel)

Este guia ajuda a apresentar o site para um público não técnico, focando no valor do produto e numa navegação simples ponta a ponta.

## Objetivo da demo
Mostrar que qualquer pessoa consegue:
- Encontrar voos que interessam
- Ver detalhes e reservar com poucos cliques
- Concluir o pagamento simulado
- Acompanhar e gerenciar as reservas no painel

## Roteiro rápido (2–3 minutos)
1. Home: mensagem breve de propósito ("encontre e reserve voos com facilidade").
2. Lista de voos: aplicar um filtro simples (origem/destino/data) e carregar resultados.
3. Detalhe do voo: destacar informações chave e clicar em “Reservar”.
4. Checkout: escolher método (Cartão/PIX) e confirmar o pagamento simulado.
5. Dashboard: ver a reserva criada e mostrar o cancelamento com confirmação (sem concluir o cancelamento se não quiser perder o registro).

## Roteiro completo (5–7 minutos)
1. Contexto (30s): problema que o FasTravel resolve (agilidade, simplicidade e transparência na reserva de voos).
2. Home (30s): navegação clara, busca direta.
3. Busca e Lista (1–2min): filtros básicos; destaque de feedback visual (skeletons/loading) e cartões com informações úteis.
4. Detalhe (1min): informações do voo + call-to-action; abrir modal de reserva.
5. Reserva e Checkout (1–2min): validações amigáveis (Formik+Yup), toasts de sucesso/erro, máscara de cartão, status “pago”.
6. Dashboard (1–2min): histórico de reservas, resumo de valores, edição de perfil; demonstrar cancelamento com modal de confirmação.
7. Encerramento (30s): próximos passos (paginação/filtros avançados, admin, documentação, seeders).

## Checklist pré-demo
- [ ] Backend ligado (API)
- [ ] Frontend ligado (site)
- [ ] Usuário de demonstração criado e credenciais à mão
- [ ] Pelo menos 3–5 voos cadastrados (dados reais ou fictícios)
- [ ] Testar fluxo completo 1x antes: busca → detalhe → reservar → checkout → dashboard
- [ ] Verificar toasts e loaders aparecendo como esperado
- [ ] Preparar plano B: screenshots das telas principais em caso de instabilidade

Sugestões práticas:
- Usar janela anônima para evitar tokens antigos.
- Evitar páginas “em construção” (admin, paginação avançada) durante a demo.
- Se o tempo for curto, começar já na lista de voos.

## Como falar (sem termos técnicos)
- “É um site para descobrir voos e reservar com poucos cliques.”
- “Quando a página está buscando resultados, mostramos uma animação para indicar carregamento.”
- “Se faltou alguma informação, o site explica o que precisa ser corrigido.”
- “Ao finalizar, a reserva aparece no seu painel, onde você pode gerenciar.”

## Pontos fortes para destacar
- Fluxo completo funcionando de ponta a ponta
- Feedback visual (toasts, loaders, máscaras de input)
- Design claro e botões de ação evidentes
- Segurança básica: login e reservas atreladas ao usuário

## Limitações atuais (e como posicionar)
- Admin e paginação avançada: planejados para a próxima fase
- Documentação/seeders: priorizamos a experiência do usuário primeiro; virão em seguida

## Perguntas frequentes (Q&A curto)
- “Posso pagar de verdade?” → Nesta fase, o pagamento é simulado para demonstrar a experiência.
- “Dá para filtrar por preço/companhia?” → Hoje temos filtros básicos; filtros avançados estão no próximo ciclo.
- “Existe área do administrador?” → Será introduzida na próxima etapa para gestão de voos e usuários.

## Dados de exemplo (preencher antes da demo)
- Usuário: demo@fastravel.com / ********
- Voos: origem/destino variados, datas nos próximos 30 dias

Boa apresentação! 👏
