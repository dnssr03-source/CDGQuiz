-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Tempo de geração: 16-Dez-2025 às 17:57
-- Versão do servidor: 8.0.40
-- versão do PHP: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `quiz_db`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `perguntas`
--

CREATE TABLE `perguntas` (
  `id` int NOT NULL,
  `categoria` varchar(50) DEFAULT NULL,
  `dificuldade` varchar(20) DEFAULT NULL,
  `pergunta` text,
  `opcoes` text,
  `correta` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Extraindo dados da tabela `perguntas`
--

INSERT INTO `perguntas` (`id`, `categoria`, `dificuldade`, `pergunta`, `opcoes`, `correta`) VALUES
(1, 'gestao', 'facil', 'A análise SWOT avalia: Forças, Fraquezas, Oportunidades e...?', '[\"Ameaças\", \"Amigos\", \"Análises\", \"Ativos\"]', 0),
(2, 'gestao', 'facil', 'O que significa a sigla CEO?', '[\"Chief Executive Officer\", \"Central Energy Option\", \"Chief Entertainment Officer\", \"Cost Extra Offer\"]', 0),
(3, 'gestao', 'facil', 'Qual é o objetivo principal do Marketing?', '[\"Vender tudo\", \"Satisfazer necessidades do cliente\", \"Fazer logotipos bonitos\", \"Contratar pessoas\"]', 1),
(4, 'gestao', 'facil', 'O que representa o ativo numa empresa?', '[\"As dívidas da empresa\", \"Os bens e direitos da empresa\", \"O capital investido pelos sócios\", \"Os custos operacionais\"]', 1),
(5, 'gestao', 'facil', 'O que é a procura, em Economia?', '[\"A quantidade de bens que os produtores vendem\", \"A quantidade de bens que os consumidores querem e podem comprar\", \"O preço de um bem no mercado\", \"O custo de produção de um bem\"]', 1),
(6, 'gestao', 'facil', 'Qual é o principal objetivo da gestão?', '[\"Aumentar apenas os lucros\", \"Reduzir todos os custos\", \"Alcançar objetivos de forma eficiente e eficaz\", \"Controlar apenas os trabalhadores\"]', 2),
(7, 'gestao', 'medio', 'O que é um KPI?', '[\"Key Performance Indicator\", \"Key Process Input\", \"Keep People Interested\", \"Key Product Info\"]', 0),
(8, 'gestao', 'medio', 'Na Matriz BCG, um produto com alta quota de mercado e baixo crescimento é:', '[\"Estrela\", \"Vaca Leiteira\", \"Abacaxi\", \"Cão\"]', 1),
(9, 'gestao', 'medio', 'O que acontece à procura quando o preço de um bem aumenta, mantendo tudo o resto constante?', '[\"A procura aumenta\", \"A procura mantém-se\", \"A procura diminui\", \"A oferta diminui\"]', 2),
(10, 'gestao', 'medio', 'Qual das seguintes é uma característica dos custos fixos?', '[\"Variam com o nível de produção\", \"Dependem do volume de vendas\", \"Mantêm-se constantes num determinado intervalo de produção\", \"São sempre custos variáveis\"]', 2),
(11, 'gestao', 'medio', 'O que representa o break-even point (ponto crítico)?', '[\"O nível máximo de vendas\", \"O nível de vendas em que há lucro máximo\", \"O nível de vendas em que não há lucro nem prejuízo\", \"O nível mínimo de custos\"]', 2),
(12, 'gestao', 'medio', 'O que significa CRM?', '[\"Customer Relationship Management\", \"Cost Revenue Model\", \"Central Risk Management\", \"Computer Room Maintenance\"]', 0),
(13, 'gestao', 'dificil', 'Quem criou o modelo das 5 Forças de Competitividade?', '[\"Philip Kotler\", \"Michael Porter\", \"Steve Jobs\", \"Peter Drucker\"]', 1),
(14, 'gestao', 'dificil', 'O que é o Ciclo PDCA?', '[\"Plan, Do, Check, Act\", \"Process, Data, Control, Analyze\", \"Product, Design, Cost, Audit\", \"People, Data, Code, AI\"]', 0),
(15, 'gestao', 'dificil', 'Em gestão de projetos, o que é o Caminho Crítico?', '[\"O caminho mais perigoso\", \"A sequência de tarefas sem folga temporal\", \"A tarefa mais cara\", \"O feedback do chefe\"]', 1),
(16, 'graficos', 'facil', 'Qual gráfico é uma tarte?', '[\"Gráfico de Linhas\", \"Gráfico Circular (Pizza)\", \"Histograma\", \"Dispersão\"]', 1),
(17, 'graficos', 'facil', 'O eixo horizontal de um gráfico chama-se geralmente:', '[\"Eixo X\", \"Eixo Y\", \"Eixo Z\", \"Eixo H\"]', 0),
(18, 'graficos', 'facil', 'Para ver a evolução de vendas ao longo do ano, usas:', '[\"Gráfico de Linhas\", \"Gráfico de Pizza\", \"Tabela sem números\", \"Radar\"]', 0),
(19, 'graficos', 'facil', 'O que é um conjunto de dados (dataset)?', '[\"Um gráfico estatístico\", \"Uma coleção de dados organizados\", \"Um algoritmo de machine learning\", \"Um software de análise\"]', 1),
(20, 'graficos', 'facil', 'Qual gráfico é mais adequado para comparar categorias?', '[\"Gráfico de linhas\", \"Gráfico de dispersão\", \"Gráfico de barras\", \"Histograma\"]', 2),
(21, 'graficos', 'facil', 'O que representa um gráfico de linhas?', '[\"Distribuição de frequências\", \"Relação entre duas variáveis\", \"Evolução de uma variável ao longo do tempo\", \"Comparação entre categorias\"]', 2),
(22, 'graficos', 'medio', 'O Boxplot serve principalmente para analisar:', '[\"A média apenas\", \"A distribuição e outliers\", \"As cores dos dados\", \"O total de vendas\"]', 1),
(23, 'graficos', 'medio', 'O que representa um Histograma?', '[\"Evolução temporal\", \"Distribuição de frequências\", \"Hierarquia da empresa\", \"Localização geográfica\"]', 1),
(24, 'graficos', 'medio', 'Num Scatter Plot (Dispersão), procuramos:', '[\"Correlação entre duas variáveis\", \"A soma total\", \"A percentagem do todo\", \"O nome do cliente\"]', 0),
(25, 'graficos', 'medio', 'Para que serve um gráfico de dispersão (scatter plot)?', '[\"Comparar valores médios\", \"Mostrar proporções\", \"Analisar a relação entre duas variáveis\", \"Representar dados categóricos\"]', 2),
(26, 'graficos', 'medio', 'O que é outlier em ciência de dados?', '[\"Um valor médio\", \"Um dado em falta\", \"Um valor que se afasta significativamente dos restantes\", \"Um erro de cálculo\"]', 2),
(27, 'graficos', 'medio', 'Qual medida é mais sensível a valores extremos?', '[\"Mediana\", \"Moda\", \"Média\", \"Quartil\"]', 2),
(28, 'graficos', 'dificil', 'Qual destes princípios deve ser evitado segundo Edward Tufte?', '[\"Data-Ink Ratio alto\", \"Chartjunk (Lixo gráfico)\", \"Clareza\", \"Escalas honestas\"]', 1),
(29, 'graficos', 'dificil', 'Para visualizar dados hierárquicos complexos, usamos um:', '[\"Treemap\", \"Pie Chart\", \"Bar Chart\", \"Line Chart\"]', 0),
(30, 'graficos', 'dificil', 'O que é a Cegueira à Mudança em visualização?', '[\"Não ver cores\", \"Não notar alterações visuais graduais\", \"Não gostar de gráficos\", \"Ter o ecrã desligado\"]', 1),
(31, 'graficos', 'dificil', 'O que indica um coeficiente de correlação próximo de 1?', '[\"Ausência de relação\", \"Correlação negativa forte\", \"Correlação positiva forte\", \"Relação aleatória\"]', 2),
(32, 'graficos', 'dificil', 'Num histograma, o que representa a altura das barras?', '[\"Valores individuais\", \"Categorias\", \"Frequência ou densidade dos dados\", \"Média dos dados\"]', 2),
(33, 'graficos', 'dificil', 'Qual gráfico é mais adequado para analisar a distribuição de uma variável contínua?', '[\"Gráfico de setores\", \"Gráfico de barras\", \"Histograma\", \"Gráfico de linhas\"]', 2),
(34, 'programacao', 'facil', 'Em Python, como imprimes texto no ecrã?', '[\"echo()\", \"console.log()\", \"print()\", \"write()\"]', 2),
(35, 'programacao', 'facil', 'Qual o símbolo de comentário em Python?', '[\"//\", \"#\", \"\", \"/* */\"]', 1),
(36, 'programacao', 'facil', 'Em SQL, SELECT * significa:', '[\"Selecionar tudo\", \"Selecionar nada\", \"Selecionar erros\", \"Apagar tudo\"]', 0),
(37, 'programacao', 'facil', 'O que é um algoritmo?', '[\"Um erro de programação\", \"Um conjunto de instruções para resolver um problema\", \"Uma linguagem de programação\", \"Um programa executável\"]', 1),
(38, 'programacao', 'facil', 'Qual destes é um tipo de dado inteiro?', '[\"3.14\", \"Texto\", \"10\", \"true\"]', 2),
(39, 'programacao', 'facil', 'Qual símbolo é usado para comentar uma linha em JavaScript?', '[\"\", \"//\", \"#\", \"/* */\"]', 1),
(40, 'programacao', 'medio', 'Qual biblioteca Python é usada para manipulação de dados (DataFrames)?', '[\"NumPy\", \"Pandas\", \"Matplotlib\", \"Requests\"]', 1),
(41, 'programacao', 'medio', 'Em SQL, qual comando une duas tabelas?', '[\"UNION\", \"JOIN\", \"CONNECT\", \"LINK\"]', 1),
(42, 'programacao', 'medio', 'O que é um loop infinito?', '[\"Um erro de sintaxe\", \"Um ciclo que nunca termina\", \"Uma variável grande\", \"Um tipo de dado\"]', 1),
(43, 'programacao', 'medio', 'Qual estrutura de controlo é usada para repetir instruções?', '[\"if\", \"switch\", \"loop (for/while)\", \"break\"]', 2),
(44, 'programacao', 'medio', 'O que faz uma função em programação?', '[\"Executa código automaticamente ao iniciar o programa\", \"Armazena dados\", \"Agrupa instruções reutilizáveis\", \"Compila o programa\"]', 2),
(45, 'programacao', 'medio', 'Qual é o resultado da expressão: 5 + \"5\" em JavaScript?', '[\"10\", \"55\", \"Erro\", \"5\"]', 1),
(46, 'programacao', 'dificil', 'Qual biblioteca é focada em Machine Learning?', '[\"Scikit-learn\", \"Flask\", \"Django\", \"PyGame\"]', 0),
(47, 'programacao', 'dificil', 'O que faz o LEFT JOIN em SQL?', '[\"Traz tudo da direita\", \"Traz tudo da esquerda e correspondências\", \"Apenas correspondências exatas\", \"Apaga a tabela esquerda\"]', 1),
(48, 'programacao', 'dificil', 'Em Python, o que é uma função Lambda?', '[\"Uma função anónima/pequena\", \"Um erro de memória\", \"Uma biblioteca de jogos\", \"Um tipo de lista\"]', 0),
(49, 'programacao', 'dificil', 'O que é recursividade?', '[\"Repetição com ciclos\", \"Uma função que chama outra função\", \"Uma função que se chama a si própria\", \"Um erro lógico\"]', 2),
(50, 'programacao', 'dificil', 'Qual é a principal vantagem da programação orientada a objetos?', '[\"Código mais curto\", \"Execução mais rápida\", \"Reutilização e organização do código\", \"Eliminação de erros\"]', 2),
(51, 'programacao', 'dificil', 'Qual é a complexidade temporal do algoritmo de pesquisa binária?', '[\"O(n)\", \"O(n²)\", \"O(log n)\", \"O(1)\"]', 2),
(52, 'vidaAcademica', 'facil', 'Quanto custa (aprox.) um fino no bar?', '[\"3.00€\", \"1.20€\", \"0.20€\", \"10.00€\"]', 1),
(53, 'vidaAcademica', 'facil', 'Qual é a sigla da nossa escola?', '[\"ISCAC\", \"ISEC\", \"FEUC\", \"FLUC\"]', 0),
(54, 'vidaAcademica', 'facil', 'Qual é a estação ao lado ISCAC?', '[\"Bencanta\", \"S.Martinho\", \"Agrária\", \"Rotunda\"]', 0),
(55, 'vidaAcademica', 'facil', 'Como se chama o senhor do bar?', '[\"Bruno\", \"Lopes\", \"Agostinho\", \"Tiburcio\"]', 0),
(56, 'vidaAcademica', 'facil', 'Como se chama o gato do ISCAC?', '[\"Iscas\", \"Riscas\", \"Bolinhas\", \"Jõao Diogo\"]', 0),
(57, 'vidaAcademica', 'medio', 'Quantos créditos ECTS tem normalmente uma disciplina semestral?', '[\"1 ou 2\", \"5 ou 6\", \"20 ou 30\", \"100\"]', 1),
(58, 'vidaAcademica', 'medio', 'Qual é o nome da Associação de Estudantes?', '[\"AEISCAC\", \"AAC\", \"Júnior ISCAC\", \"Tuna\"]', 0),
(59, 'vidaAcademica', 'medio', 'Quanto custa um pack do pintos?', '[\"2.5€\", \"3€\", \"2€\", \"1.5€\"]', 0),
(60, 'vidaAcademica', 'medio', 'Em que mês é normalmente a Queima das Fitas?', '[\"Janeiro\", \"Maio\", \"Agosto\", \"Dezembro\"]', 1),
(61, 'vidaAcademica', 'dificil', 'Em que ano foi fundado o ISCAC (origens/instituto)?', '[\"1974\", \"1972\", \"1973\", \"1982\"]', 1),
(62, 'vidaAcademica', 'dificil', 'Qual é a melhor casa de banho do ISCAC?', '[\"piso 1\", \"piso 0\", \"piso 2\", \"Deficientes\"]', 1),
(63, 'vidaAcademica', 'dificil', 'Como se chama o segurança dançarino do ISCAC?', '[\"Miguel\", \"Monteiro\", \"Luis\", \"Ze\"]', 1),
(64, 'vidaAcademica', 'dificil', 'Qual é o nome da Tuna Masculina do ISCAC?', '[\"Tuna de Medicina\", \"Littera\", \"Estudantina\", \"Orquestra\"]', 2),
(65, 'vidaAcademica', 'dificil', 'Qual é o grau académico obtido após 3 anos?', '[\"Mestrado\", \"Licenciatura\", \"Doutoramento\", \"Pós-Graduação\"]', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `recordes_rapido`
--

CREATE TABLE `recordes_rapido` (
  `id` int NOT NULL,
  `nome_utilizador` varchar(50) NOT NULL,
  `pontuacao` int NOT NULL,
  `data_registo` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `perguntas`
--
ALTER TABLE `perguntas`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `recordes_rapido`
--
ALTER TABLE `recordes_rapido`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `perguntas`
--
ALTER TABLE `perguntas`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT de tabela `recordes_rapido`
--
ALTER TABLE `recordes_rapido`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
