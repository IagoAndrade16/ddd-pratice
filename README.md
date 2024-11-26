# Clean Architeture x Design de Software

## DDD (Domain-driven Design)

- Design dirigido a domínio
- Não tem nada a ver com o código
- Maneira com o software vai ser desenhado
- Desconectado do mundo externo

## Estrutura do projetos

- Algumas explicações sobre a estrutura de pastas do projeto projeto
  - src: pasta que contém o código fonte
  - src/domain: pasta que contém toda a regra de negócio externa, desconectada do mundo externo
  - src/core: pasta que contém funcionalidades compartilhadas entre todo o sistema

## Domínio

- Domain Experts
  - Conversa
- Linguagem ubíqua

- Usuário
  - Cliente
  - Fornecedor
  - Atendente
  - Barman

- Agregados
- Value Objects
  - Entidades que possuem regras de negócios próprias
  - Quase tudo pode até virar value objects, porém só é necessário para coisas mais importantes, ou que contém muito código acumulado
- Eventos de domínio
- Subdomínios (Bounded Contexts)
- Entidades
  - Palavras chave do domínio (algo palpável)
  - Não necessariamente tabelas no banco de dados
  - Desconectar o pensamento de tabela de banco das entidades
- Casos de uso
  - Como as entidades se comunicam entre si (ações)

- Tomar cuidado com níveis de abstração. Ou seja, muitas vezes, trechos de código vão ser parecidos, mas isso não quer dizer que você deve unificar tudo. O conceito do DDD se baseia em traduzir a linguagem do mundo real, em código. Logo pode ser que existam códigos muito parecidos? Sim, mas isso não significa que você deve abstrair tudo em uma coisa só. Devemos levar em conta que podem existir regras de negócio diferentes para cada entidade, usecase e assim em diante.
