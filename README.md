<a name="br1"></a> 

Documentação do Sistema

**No Time For Waste**

Arthur Quintanilha Duarte

Lucas Felipe Oliveira Ramalho

**1. Descrição geral do CONTEXTO (Minimundo)..................................................................1**

**2. Conteúdos e Materiais de Referência.............................................................................. 2**

**3. Descrição sucinta da solução (Sistema a ser desenvolvido)........................................ 5**

**4. Diagrama de Casos de Uso...............................................................................................6**

**5. Descrição dos Casos de Uso............................................................................................6**

**6. Modelo de Dados Persistentes....................................................................................... 10**

**7. Protótipos de Interface.................................................................................................... 11**

7\.1. Protótipos de Telas Comuns a Todos Usuário...........................................................11

7\.2. Protótipos de Telas Comuns às Empresas:.............................................................. 13

7\.3. Protótipos de Telas Comuns aos Clientes:................................................................31

**1. Descrição geral do CONTEXTO (Minimundo)**

Atualmente um dos grandes problemas da humanidade é o desperdício de alimentos, no

Brasil, segundo a ANR, 36% desse desperdício advém de produtos vencidos. Esse

desperdício gera um impacto negativo na economia e no meio ambiente, contribuindo para

o aumento da fome e desigualdade social. Muitas pessoas no país ainda enfrentam

dificuldades para ter acesso a alimentos de qualidade, enquanto outros alimentos são

descartados antes mesmo de chegarem às prateleiras dos supermercados.

Socialmente, o desperdício de alimentos é ainda mais alarmante, pois muitas pessoas no

país ainda enfrentam dificuldades para ter acesso a alimentos de qualidade. Ao mesmo

tempo, toneladas de alimentos são descartados diariamente, muitas vezes por motivos

estéticos ou de logística.



<a name="br2"></a> 


Existem muitas empresas que atuam na tentativa de diminuir o número de desperdício de

alimentos, como supermercados, que criam uma sessão de itens que estão perto da

validade, com uma promoção significativa para atrair consumidores. Assim como o

aplicativo “Food to Save”, em que estabelecimentos aproveitam produtos excedentes ou

que estejam próximos da data de validade, criando pacotes e vendendo eles com desconto

de até 70%, o qual já salvou mais de 165 milhões de toneladas de alimentos de irem para

as latas de lixo.

Nesse app os estabelecimentos cadastram os pacotes que serão exibidos no feed de

pacotes do cliente (aba de início do app), os clientes podem então clicar sobre o pacote

para obter mais informações sobre o mesmo e então fazer o pedido do pacote. Entretanto

os pacotes cadastrados pelos estabelecimentos são "misteriosos", não tendo uma descrição

do que tem neles, apenas em qual tipo eles se encaixam (confeitaria, doce, salgado

padaria, etc), o que pode ser um problema para muitas pessoas que não consomem

determinado tipo de produto que pode estar nesses pacotes. Por mais que exista a iniciativa

de diminuir as taxas de desperdício alimentício no país, ela não tem um alcance tão grande.

Como tentativa de combater parte desse problema surgiu a ideia de criar uma forma para

que restaurantes e outros comércios do ramo de alimentos pudessem oferecer aos seus

clientes produtos perto do vencimento, geralmente descartados, por um preço menor. Para

os restaurantes é vantajoso vender um produto que ia pro lixo, para os clientes é vantajoso

comprar um produto ainda consumível por um preço menor, isso tudo sendo sustentável.



**3. Descrição sucinta da solução (Sistema a ser desenvolvido)**

Será desenvolvido um aplicativo mobile para clientes e empresas, onde estabelecimentos

podem se cadastrar, gerenciar e visualizar pacotes com alimentos. Os clientes se

cadastram, fazem login, fazem pedidos e acompanham o status do mesmo. O sistema é

mobile por conta da praticidade e facilidade de gerenciamento de fotos dos pacotes pelos

estabelecimentos e pela praticidade do cliente usar um app para realizar pedidos.

**4.**

**Diagrama de Casos de Uso**



<a name="br6"></a> 


**5.**

**Descrição dos Casos de Uso**
![image](https://github.com/NoTimeForWaste/notimeforwaste/assets/129795249/8ace0819-2327-4585-b9d1-f41c8c1ea53f)


Legenda

\*

Caso de uso a ser implementado na primeira versão funcional da aplicação.

Caso de uso a ser implementado incrementalmente, no decorrer da disciplina, se der

tempo.

\*\*

\*\*\* Caso de uso previsto para ser implementado após o término da disciplina.

**UC-001\***

**Cadastrar-se**

Cadastro e atualização de dados. Um cliente pode se cadastrar no sistema usando

dados como: nome, email e senha. Uma empresa pode se cadastrar no sistema

usando dados como: nome, CNPJ, foto(logo), endereço, horário de funcionamento

(segunda a sexta, sábado e domingo), telefone, e-mail e senha. Uma empresa e um

cliente podem visualizar e atualizar seus dados. Uma empresa não pode alterar seu

CNPJ. Um cliente não pode atualizar seu email. Um cliente pode cadastrar um ou

mais endereços. Uma empresa deve obrigatoriamente cadastrar um endereço ao se

cadastrar, um cliente pode ou não cadastrar um endereço no momento do cadastro.

Um usuário (empresa ou cliente) pode também atualizar a sua senha, caso a

mesma tenha sido "esquecida", onde será enviado uma mensagem por email com

os detalhes para recuperar/alterar sua senha.

**UC-002\***

**Gerenciar Endereço**

O usuário (empresa ou cliente) deve cadastrar seu endereço, informando cidade,

bairro, casa, número e CEP. O cliente pode cadastrar vários endereços, enquanto a

empresa deve cadastrar um endereço.

**UC-003\***

**Fazer Login**

Login no sistema. Todo usuário (empresa ou cliente) pode fazer login no sistema

para acessar suas funcionalidades. Um cliente pode fazer login no sistema usando

email e senha.Uma empresa pode fazer login no sistema usando dados como CNPJ

ou email e senha.



<a name="br7"></a> 


**UC-004\***

**Gerenciar Pacote**

Uma empresa autenticada no sistema pode criar um pacote. Um pacote deve ter ao

menos um produto. O pacote terá informações como: nome, preço, foto, descrição,

formas de pagamento disponíveis (cartão de crédito, débito, à vista no dinheiro e

pix) e formas de entrega (entrega por delivery e retirada pelo cliente), além do(s)

produto(s) nele cadastrado. Uma empresa pode excluir e editar um pacote do

sistema desde que não tenha sido vendido. Um pacote dado como entregue ainda

pode ser visualizado pela empresa, porém apenas dentro do pedido correspondente

a ele. Um pacote dado como entregue não pode ser excluído. Um pacote que foi

vendido não pode ser visualizado pelos clientes no feed de pacotes, a não ser que o

cliente seja o que comprou o mesmo, nesse caso o pacote comprado será exibido

dentro do pedido correspondente a ele.

**UC-005\***

**Cadastrar um Produto num Pacote**

Uma empresa pode cadastrar produtos num pacote. Um produto pode estar em um,

e apenas um, pacote. Um produto deve ter dados como: nome, data de validade e

descrição.

**UC-006\***

**Gerenciar Pedido**

Efetuar e cancelar pedido. Um cliente autenticado pode fazer o pedido de um pacote

que esteja no feed de pacotes, desde que a empresa fornecedora do pacote esteja

em horário de funcionamento. Para efetuar um pedido o cliente precisa inserir dados

como: endereço da entrega ou selecionar a opção ‘retirado’, caso essa esteja

disponível, forma de pagamento e observação. O frete de um pedido é calculado

automaticamente pelo sistema e será exibido assim que um endereço for

selecionado pelo cliente, no caso de ‘retirada’ o frete será de R$00,00. Um cliente

pode cancelar um pedido, desde que esse não esteja marcado como "a caminho"

ou “entregue”. Um cliente pode confirmar a entrega de um pedido.



<a name="br8"></a> 


**UC-007\***

**Atualizar Dados de Um Pedido**

Atualizar os dados de um pedido. Toda empresa cadastrada pode aceitar ou não o

pedido feito, cancelar o pedido, informar que o pedido está sendo feito, a caminho

ou se foi entregue. Uma empresa não pode cancelar um pedido dado como

“entregue”.



<a name="br9"></a> 

Documentação do Sistema

**6. Modelo de Dados Persistentes**
![image](https://github.com/NoTimeForWaste/notimeforwaste/assets/129795249/e102c36b-1965-415f-b624-20ee3bdfdc63)



<a name="br10"></a> 


**7. Protótipos de Interface**

Link do Projeto no Figma: [No](https://www.figma.com/file/IPfNO0aSU9tmuhXGOWdrMR/Prot%C3%B3tipo-de-Telas%3A-No-Time-For-Waste?type=design&node-id=4%3A11&t=xPTQvcjVCXiGAef2-1)[ ](https://www.figma.com/file/IPfNO0aSU9tmuhXGOWdrMR/Prot%C3%B3tipo-de-Telas%3A-No-Time-For-Waste?type=design&node-id=4%3A11&t=xPTQvcjVCXiGAef2-1)[Time](https://www.figma.com/file/IPfNO0aSU9tmuhXGOWdrMR/Prot%C3%B3tipo-de-Telas%3A-No-Time-For-Waste?type=design&node-id=4%3A11&t=xPTQvcjVCXiGAef2-1)[ ](https://www.figma.com/file/IPfNO0aSU9tmuhXGOWdrMR/Prot%C3%B3tipo-de-Telas%3A-No-Time-For-Waste?type=design&node-id=4%3A11&t=xPTQvcjVCXiGAef2-1)[For](https://www.figma.com/file/IPfNO0aSU9tmuhXGOWdrMR/Prot%C3%B3tipo-de-Telas%3A-No-Time-For-Waste?type=design&node-id=4%3A11&t=xPTQvcjVCXiGAef2-1)[ ](https://www.figma.com/file/IPfNO0aSU9tmuhXGOWdrMR/Prot%C3%B3tipo-de-Telas%3A-No-Time-For-Waste?type=design&node-id=4%3A11&t=xPTQvcjVCXiGAef2-1)[Waste](https://www.figma.com/file/IPfNO0aSU9tmuhXGOWdrMR/Prot%C3%B3tipo-de-Telas%3A-No-Time-For-Waste?type=design&node-id=4%3A11&t=xPTQvcjVCXiGAef2-1)[ ](https://www.figma.com/file/IPfNO0aSU9tmuhXGOWdrMR/Prot%C3%B3tipo-de-Telas%3A-No-Time-For-Waste?type=design&node-id=4%3A11&t=xPTQvcjVCXiGAef2-1)[-](https://www.figma.com/file/IPfNO0aSU9tmuhXGOWdrMR/Prot%C3%B3tipo-de-Telas%3A-No-Time-For-Waste?type=design&node-id=4%3A11&t=xPTQvcjVCXiGAef2-1)[ ](https://www.figma.com/file/IPfNO0aSU9tmuhXGOWdrMR/Prot%C3%B3tipo-de-Telas%3A-No-Time-For-Waste?type=design&node-id=4%3A11&t=xPTQvcjVCXiGAef2-1)[Protótipos](https://www.figma.com/file/IPfNO0aSU9tmuhXGOWdrMR/Prot%C3%B3tipo-de-Telas%3A-No-Time-For-Waste?type=design&node-id=4%3A11&t=xPTQvcjVCXiGAef2-1)


