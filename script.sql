INSERT INTO public.especializacao (nome) VALUES
('Odontologia'),
('Neurologia'),
('Pediatria'),
('Oftamologia'),
('Psiquiatria'),
('Ortopedia'),
('Cardiologia'),
('Fisioterapia'),
('Urologia'),
('Psicologia');

INSERT INTO public.paciente (id, nome, sexo, data_nascimento, contato) VALUES
(20231038060001, 'Charles Leclerc', 'M', '1997-10-16', '@charlesleclerc'),
(20231038060002, 'Max Verstappen', 'M', '1997-09-30', '@maxverstappen1'),
(20231038060003, 'Sebastian Vettel', 'M', '1987-07-03', '@sebastianvettel'),
(20231038060004, 'Alain Prost', 'M', '1955-02-24', '@alainprost'),
(20231038060005, 'Stirling Moss', 'M', '1929-09-17', '@stirlingmoss'),
(20231038060006, 'Fernando Alonso', 'M', '1981-07-29', '@fernandoalo_oficial'),
(20231038060007, 'Juan Manuel Fangio', 'M', '1911-06-24', '@juanmanuelfangio'),
(20231038060008, 'Kimi Räikkönen', 'M', '1979-10-17', '@kimiraikkonen'),
(20231038060009, 'Jim Clark', 'M', '1936-03-04', '@jimclark'),
(20231038060010, 'Niki Lauda', 'M', '1949-02-22', '@nikilauda'),
(20231038060011, 'Damon Hill', 'M', '1960-09-17', '@damonhill'),
(20231038060012, 'Jenson Button', 'M', '1980-01-19', '@jensonbutton'),
(20231038060013, 'Graham Hill', 'M', '1929-02-15', '@grahamhill');

INSERT INTO public.profissional (id, nome, registro_profissional, status, "especializacaoId") VALUES
(20231038060014, 'Lewis Hamilton', 'CRP-202544', 'ativo', 1),
(20231038060015, 'Sebastian Vettel', 'CRP-202550', 'ativo', 2),
(20231038060016, 'Fernando Alonso', 'CRP-202551', 'ativo', 3),
(20231038060017, 'Kimi Räikkönen', 'CRP-202552', 'ativo', 4),
(20231038060018, 'Alain Prost', 'CRP-202553', 'ativo', 5),
(20231038060019, 'Mark Webber', 'CRP-202554', 'ativo', 6),
(20231038060020, 'Jenson Button', 'CRP-202555', 'ativo', 7),
(20231038060021, 'Stirling Moss', 'CRP-202556', 'ativo', 8),
(20231038060022, 'Juan Manuel Fangio', 'CRP-202557', 'ativo', 9),
(20231038060023, 'Graham Hill', 'CRP-202558', 'ativo', 10),
(20231038060024, 'Valtteri Bottas', 'CRP-202559', 'ativo', 1),
(20231038060025, 'Charles Leclerc', 'CRP-202560', 'ativo', 2),
(20231038060026, 'Nico Rosberg', 'CRP-202561', 'ativo', 3),
(20231038060027, 'Marc Surer', 'CRP-202562', 'ativo', 4),
(20231038060028, 'Jackie Stewart', 'CRP-202563', 'ativo', 5),
(20231038060029, 'Jim Clark', 'CRP-202564', 'ativo', 6),
(20231038060030, 'Emerson Fittipaldi', 'CRP-202565', 'ativo', 7),
(20231038060031, 'Johnny Herbert', 'CRP-202566', 'ativo', 8),
(20231038060032, 'Damon Hill', 'CRP-202567', 'ativo', 9);


INSERT INTO public.atendimento (horario, status, "profissionalId") VALUES
('2025-01-23 07:00:00', 'confirmado', 20231038060014),
('2025-01-24 08:00:00', 'confirmado', 20231038060015),
('2025-01-25 09:00:00', 'confirmado', 20231038060016),
('2025-01-26 10:00:00', 'confirmado', 20231038060017),
('2025-01-27 11:00:00', 'confirmado', 20231038060018),
('2025-01-28 12:00:00', 'confirmado', 20231038060019),
('2025-01-29 13:00:00', 'confirmado', 20231038060020),
('2025-01-30 14:00:00', 'confirmado', 20231038060021),
('2025-01-31 15:00:00', 'confirmado', 20231038060022),
('2025-02-01 16:00:00', 'confirmado', 20231038060023);

INSERT INTO public.consultas ("atendimentoId", "pacienteId") VALUES
(1, 20231038060001),
(2, 20231038060009),
(3, 20231038060003),
(4, 20231038060004),
(5, 20231038060008),
(6, 20231038060006),
(7, 20231038060001),
(8, 20231038060001),
(9, 20231038060002),
(10, 20231038060003);
