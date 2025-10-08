<samp>

# Tech Challenge 03 - Pós Tech FIAP - FSDT/2025 - Grupo 54
<p>💾 Terceiro desafio da pós graduação em desenvolvimento full-stack <a href="https://postech.fiap.com.br/curso/full-stack-development">@FIAP</a></p> 
<details>
  <summary><samp>Descrição do Desafio</samp></summary>
  <br>
O Tech Challenge é uma atividade de desenvolvimento de software em
grupo que integra os conhecimentos adquiridos durante a fase atual do curso. A
entrega deste projeto é obrigatória e compreende 90% da nota final em todas as
disciplinas desta fase.

## O problema
Após o sucesso do desenvolvimento da aplicação de blogging dinâmico
utilizando a plataforma OutSystems e a implementação do back-end em Node.js,
chegou a hora de criarmos uma interface gráfica robusta, intuitiva e eficiente para
esta aplicação. Este desafio focará em desenvolver o front-end, proporcionando
uma experiência de usuário excelente tanto para professores(as) quanto para
estudantes.

## Objetivo
Desenvolver uma interface gráfica para a aplicação de blogging utilizando
React. A aplicação deve ser responsiva, acessível e fácil de usar, permitindo aos
docentes e alunos(as) interagir com os diversos endpoints REST já
implementados no back-end.
 
## Requisitos funcionais:
A interface gráfica deve incluir as seguintes páginas e funcionalidades:
- Página principal (Lista de posts)<br>
▪ Exibir uma lista de todos os posts disponíveis.<br>
▪ Cada item da lista deve mostrar o título, autor e uma breve
descrição do post.<br>
▪ Incluir um campo de busca para filtrar posts por palavras-chave.<br>
- Página de leitura de post
▪ Exibir o conteúdo completo de um post selecionado.<br>
▪ Permitir comentários nos posts (opcional).<br>
- Página de criação de postagens
▪ Formulário para que docentes possam criar postagens.<br>
▪ Campos para título, conteúdo e autor.<br>
▪ Botão para enviar o post ao servidor.<br>
- Página de edição de postagens
▪ Formulário para que os(as) professores(as) possam editar
postagens existentes.<br>
▪ Carregar os dados atuais do post para edição.<br>
▪ Botão para salvar as alterações.<br>
- Página administrativa
▪ Exibir uma lista de todas as postagens, com opções para editar e
excluir cada post.<br>
▪ Botões para editar e excluir postagens específicas.<br>
- Autenticação e autorização
▪ Implementar login para professores.<br>
▪ Garantir que apenas usuários autenticados possam acessar as
páginas de criação, edição e administração de postagens.<br>

   
## Requisitos técnicos:
- Desenvolvimento em React<br>
▪ Utilizar React para desenvolver a interface gráfica.<br>
▪ Utilização de hooks e componentes funcionais.<br>
- Estilização e responsividade<br>
▪ Utilizar Styled Components ou outro método de estilização.<br>
▪ Garantir que a aplicação seja responsiva, funcionando bem em
dispositivos móveis e desktops.<br> 
- Integração com Back-End<br>
▪ Realizar chamadas aos endpoints REST para obter, criar, editar e
excluir posts.<br>
▪ Gerenciar o estado da aplicação com ferramentas como Context
API ou Redux (opcional).
- Documentação<br>
▪ Documentação técnica detalhada do front-end no README do
repositório, incluindo setup inicial, arquitetura da aplicação e guia
de uso.
 
## Entrega
- Código-Fonte: repositório GitHub com o código do projeto, incluindo
Dockerfiles e scripts de CI/CD.
- Apresentação Gravada: demonstração em vídeo do funcionamento da
aplicação, incluindo detalhes técnicos de implementação.
- Documentação: documento descrevendo a arquitetura do sistema, uso
da aplicação e relato de experiências e desafios enfrentados pela equipe
durante o desenvolvimento.
</details>

## Membros do Grupo 54:
<a href="https://github.com/natashalisboa">Natasha Lisboa</a> | 
<a href="https://github.com/lmagueta">Lucas Magueta</a>
</samp>

## Portal Múltipla Escolha
Este repositório contém o front-end do **Portal Múltipla Escolha**, uma plataforma em desenvolvimento que visa enfrentar o desafio da escassez de ferramentas eficazes para a publicação e o compartilhamento centralizado de conteúdos educacionais de forma acessível e organizada.

## 🧱 Arquitetura
A aplicação adota uma arquitetura baseada em microsserviços, estruturada no padrão MVC (Model-View-Controller). Essa abordagem favorece a escalabilidade, organização e manutenção do sistema.
### Tecnologias
- **Front-end**: React com utilização de hooks.
- **back-end**: Node.js com Express.js para construção da API RESTful. Disponível <a href="https://github.com/lmagueta/fiap-tech-challenge-02">aqui</a>.
- **Banco de Dados**: PostgreSQL (produção).
- **Containerização**: Docker para garantir consistência entre os ambientes.
- **Autenticação**: JWT (JSON Web Tokens).

## ⚙️ **Setup Inicial**
### **Pré-requisitos**
- **Node.js**: versão 20 ou superior;
- **Docker e Docker Compose** (para containerização): Para utilizar a aplicação em contêineres, é necessário ter o Docker instalado. Você pode fazer o download [neste link](https://www.docker.com/get-started). O Docker Compose, utilizado para orquestrar os serviços, normalmente já é incluído na instalação padrão do Docker.
- **Git**.

## 📦 **Passo a Passo**

1. Clonando o repositório:
   ```bash
   git clone https://github.com/natashalisboa/fiap-tech-challenge-03.git
   cd fiap-tech-challenge-03
   ```
2. Instalando as dependências:
   ```bash
   npm install
   ```
3. Configurando e iniciando o ambiente com Docker:
   ```bash
   docker-compose up --build
   ```
4. Iniciando o servidor em modo de desenvolvimento:
   ```bash
   docker run -p 8080:80 app-react
   ```
   O servidor estará disponível em `http://localhost:8080`.

## Guia de funcionalidade das telas

### Tela de Login
Realiza autenticação do usuário e valida o tipo de acesso (Aluno, Professor ou Admin)

#### Tela de Listagem de Publicações
Busca todas as publicações feitas. 
Permite buscar por palavra-chave, tanto nos títulos quanto no conteúdo.
Permite acessar os detalhes de uma publicação

#### Tela de Detalhes da Publicação
Exibe o título, autor, matéria, conteúdo e comentários da publicação.
Caso seja Professor ou Admin, habilita botões de editar e excluir a publicação.
Permite postar novos comentários.

#### Tela de Criação de Publicação
Esta tela só é exibida para os perfis de Professor e Admin.
Exibe um formulário para publicação de uma nova publicação.
O autor da publicação é o usuário logado.

### Funcionalidades
Todas as telas contam com a funcionalidade de alterar o modo de exibição para Dark ou Light.
Todas as telas contam com uma opção de logout do sistema.



## **Breve Demonstração**
[Vídeo](https://www.youtube.com/watch?v=t7waPOUyEN8)

## **Desafios e Conclusão**
Durante o desenvolvimento do front-end do Tech Challenge, a equipe enfrentou diversos desafios que exigiram colaboração, pesquisa e adaptação constante. Um dos principais obstáculos foi garantir a integração fluida entre o React e o back-end em Node.js, especialmente na comunicação com os endpoints REST, o que demandou atenção à estrutura das requisições e ao gerenciamento de estados. A implementação da autenticação também trouxe complexidade, exigindo um bom entendimento sobre controle de acesso e persistência de sessões. Além disso, a preocupação com a responsividade e acessibilidade da interface exigiu testes e ajustes contínuos para oferecer uma boa experiência em diferentes dispositivos. Outro ponto desafiador foi alinhar o design e a usabilidade da aplicação às expectativas dos usuários, mantendo a interface intuitiva e coerente. Apesar das dificuldades, o projeto proporcionou um aprendizado significativo em React, boas práticas de desenvolvimento e trabalho em equipe, reforçando a importância da organização e da comunicação em ambientes colaborativos.
<p>
