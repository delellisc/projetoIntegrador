BEGIN;

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

INSERT INTO public.paciente (id, nome, data_nascimento, contato) VALUES
(20231038060001, 'Charles Leclerc', '1997-10-16', '@charlesleclerc'),
(20231038060002, 'Max Verstappen', '1997-09-30', '@maxverstappen1'),
(20231038060003, 'Sebastian Vettel', '1987-07-03', '@sebastianvettel'),
(20231038060004, 'Alain Prost', '1955-02-24', '@alainprost'),
(20231038060005, 'Stirling Moss', '1929-09-17', '@stirlingmoss'),
(20231038060006, 'Fernando Alonso', '1981-07-29', '@fernandoalo_oficial'),
(20231038060007, 'Juan Manuel Fangio', '1911-06-24', '@juanmanuelfangio'),
(20231038060008, 'Kimi Räikkönen', '1979-10-17', '@kimiraikkonen'),
(20231038060009, 'Jim Clark', '1936-03-04', '@jimclark'),
(20231038060010, 'Niki Lauda', '1949-02-22', '@nikilauda'),
(20231038060011, 'Damon Hill', '1960-09-17', '@damonhill'),
(20231038060012, 'Jenson Button', '1980-01-19', '@jensonbutton'),
(20231038060013, 'Graham Hill', '1929-02-15', '@grahamhill');

INSERT INTO public.profissional (id, nome, registro_profissional, status, "especializacaoId") VALUES
(20191031120011, 'Camilo de Lellis', 'CRP-212744', 'ativo', 2),
(20231038060015, 'Sebastian Vettel', 'CRP-202550', 'ativo', 2),
(20231038060016, 'Fernando Alonso', 'CRP-202551', 'ativo', 3),
(20231038060017, 'Kimi Räikkönen', 'CRP-202552', 'ativo', 4),
(20231038060018, 'Alain Prost', 'CRP-202553', 'ativo', 5),
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
(20231038060032, 'Damon Hill', 'CRP-202567', 'ativo', 9),
(20231038060033, 'Mark Webber', 'CRP-202554', 'ativo', 6),
(20231038060034, 'Lewis Hamilton', 'CRP-202544', 'ativo', 1);

INSERT INTO public.atendimento (horario, status, "profissionalId") VALUES
('2025-02-05 08:00:00', 'confirmado', 20231038060026),
('2025-02-05 10:00:00', 'confirmado', 20231038060027),
('2025-02-12 09:00:00', 'confirmado', 20231038060024),
('2025-02-18 11:00:00', 'confirmado', 20231038060025),
('2025-02-18 08:00:00', 'confirmado', 20231038060026),
('2025-02-25 10:00:00', 'confirmado', 20231038060027),
('2025-03-03 08:00:00', 'confirmado', 20231038060024),
('2025-03-03 10:00:00', 'confirmado', 20231038060025),
('2025-03-04 09:00:00', 'confirmado', 20231038060026),
('2025-03-04 13:00:00', 'confirmado', 20231038060027),
('2025-03-05 08:00:00', 'confirmado', 20231038060028),
('2025-03-05 10:00:00', 'confirmado', 20231038060029),
('2025-03-06 11:00:00', 'confirmado', 20231038060030),
('2025-03-06 13:00:00', 'confirmado', 20231038060031),
('2025-03-07 09:00:00', 'confirmado', 20231038060032),
('2025-03-07 11:00:00', 'confirmado', 20231038060033),
('2025-03-10 08:00:00', 'confirmado', 20231038060024),
('2025-03-10 10:00:00', 'confirmado', 20231038060025),
('2025-03-12 09:00:00', 'confirmado', 20231038060028),
('2025-03-12 13:00:00', 'confirmado', 20231038060029),
('2025-03-13 08:00:00', 'confirmado', 20231038060030),
('2025-03-13 10:00:00', 'confirmado', 20231038060031),
('2025-03-14 09:00:00', 'confirmado', 20231038060032),
('2025-03-14 11:00:00', 'confirmado', 20231038060033),
('2025-03-17 08:00:00', 'confirmado', 20231038060024),
('2025-03-17 10:00:00', 'confirmado', 20231038060025),
('2025-03-18 09:00:00', 'confirmado', 20231038060026),
('2025-03-18 11:00:00', 'confirmado', 20231038060027),
('2025-03-19 08:00:00', 'confirmado', 20231038060028),
('2025-03-19 10:00:00', 'confirmado', 20231038060029),
('2025-03-20 09:00:00', 'confirmado', 20231038060030),
('2025-03-20 11:00:00', 'confirmado', 20231038060031),
('2025-03-24 11:00:00', 'confirmado', 20231038060025),
('2025-03-26 11:00:00', 'confirmado', 20231038060029),
('2025-03-27 08:00:00', 'confirmado', 20231038060030),
('2025-03-27 10:00:00', 'confirmado', 20231038060031),
('2025-03-28 09:00:00', 'confirmado', 20231038060032),
('2025-03-28 11:00:00', 'confirmado', 20231038060033),
('2025-04-08 09:00:00', 'confirmado', 20231038060028),
('2025-04-11 08:00:00', 'confirmado', 20231038060026),
('2025-04-11 10:00:00', 'confirmado', 20231038060027),
('2025-04-15 09:00:00', 'confirmado', 20231038060032),
('2025-04-14 11:00:00', 'confirmado', 20231038060033),
('2025-04-18 09:00:00', 'confirmado', 20231038060024);

INSERT INTO public.consultas ("atendimentoId", "pacienteId") VALUES
(1, 20231038060001),
(1, 20231038060002),
(1, 20231038060003),
(2, 20231038060004),
(2, 20231038060005),
(2, 20231038060006),
(3, 20231038060007),
(3, 20231038060008),
(3, 20231038060019),
(4, 20231038060010),
(4, 20231038060011),
(4, 20231038060012),
(5, 20231038060013),
(5, 20231038060001),
(5, 20231038060002),
(6, 20231038060003),
(6, 20231038060004),
(6, 20231038060005),
(7, 20231038060006),
(7, 20231038060007),
(7, 20231038060008),
(8, 20231038060009),
(8, 20231038060019),
(8, 20231038060011),
(9, 20231038060012),
(9, 20231038060013),
(9, 20231038060001),
(10, 20231038060002),
(10, 20231038060003),
(10, 20231038060004),
(11, 20231038060005),
(11, 20231038060006),
(11, 20231038060007),
(12, 20231038060008),
(12, 20231038060009),
(12, 20231038060010),
(13, 20231038060011),
(13, 20231038060012),
(13, 20231038060013),
(14, 20231038060002),
(14, 20231038060004),
(14, 20231038060019),
(15, 20231038060001),
(15, 20231038060006),
(15, 20231038060012),
(16, 20231038060019),
(17, 20231038060019),
(18, 20231038060019),
(19, 20231038060019),
(20, 20231038060019),
(21, 20231038060019),
(22, 20231038060019),
(23, 20231038060019),
(24, 20231038060019);

COMMIT;

/* ************************** */
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') 
    LOOP
        EXECUTE 'DROP TABLE IF EXISTS public.' || r.tablename || ' CASCADE';
    END LOOP;
END $$;
