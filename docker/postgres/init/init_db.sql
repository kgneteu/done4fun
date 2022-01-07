--
-- PostgreSQL database dump
--

-- Dumped from database version 14.1 (Debian 14.1-1.pgdg110+1)
-- Dumped by pg_dump version 14.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: kid_prizes; Type: TABLE; Schema: public; Owner: ufo
--

CREATE TABLE public.kid_prizes (
    id bigint NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    kid_id bigint NOT NULL,
    prize_id bigint NOT NULL,
    chosen_at timestamp with time zone,
    collected boolean DEFAULT false
);


ALTER TABLE public.kid_prizes OWNER TO ufo;

--
-- Name: kid_prizes_id_seq; Type: SEQUENCE; Schema: public; Owner: ufo
--

CREATE SEQUENCE public.kid_prizes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.kid_prizes_id_seq OWNER TO ufo;

--
-- Name: kid_prizes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ufo
--

ALTER SEQUENCE public.kid_prizes_id_seq OWNED BY public.kid_prizes.id;


--
-- Name: message_statuses; Type: TABLE; Schema: public; Owner: ufo
--

CREATE TABLE public.message_statuses (
    id bigint NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    recipient_id bigint NOT NULL,
    message_id bigint NOT NULL,
    viewed boolean DEFAULT false,
    confirmed boolean DEFAULT false
);


ALTER TABLE public.message_statuses OWNER TO ufo;

--
-- Name: message_statuses_id_seq; Type: SEQUENCE; Schema: public; Owner: ufo
--

CREATE SEQUENCE public.message_statuses_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.message_statuses_id_seq OWNER TO ufo;

--
-- Name: message_statuses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ufo
--

ALTER SEQUENCE public.message_statuses_id_seq OWNED BY public.message_statuses.id;


--
-- Name: messages; Type: TABLE; Schema: public; Owner: ufo
--

CREATE TABLE public.messages (
    id bigint NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    sender_id bigint NOT NULL,
    message text NOT NULL,
    need_confirmation boolean DEFAULT false
);


ALTER TABLE public.messages OWNER TO ufo;

--
-- Name: messages_id_seq; Type: SEQUENCE; Schema: public; Owner: ufo
--

CREATE SEQUENCE public.messages_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.messages_id_seq OWNER TO ufo;

--
-- Name: messages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ufo
--

ALTER SEQUENCE public.messages_id_seq OWNED BY public.messages.id;


--
-- Name: migrations; Type: TABLE; Schema: public; Owner: ufo
--

CREATE TABLE public.migrations (
    id character varying(255) NOT NULL
);


ALTER TABLE public.migrations OWNER TO ufo;

--
-- Name: prizes; Type: TABLE; Schema: public; Owner: ufo
--

CREATE TABLE public.prizes (
    id bigint NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    kid_id bigint NOT NULL,
    name text NOT NULL,
    points bigint DEFAULT 1 NOT NULL,
    icon bigint DEFAULT 1,
    one_time boolean DEFAULT false,
    published boolean DEFAULT true
);


ALTER TABLE public.prizes OWNER TO ufo;

--
-- Name: prizes_id_seq; Type: SEQUENCE; Schema: public; Owner: ufo
--

CREATE SEQUENCE public.prizes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.prizes_id_seq OWNER TO ufo;

--
-- Name: prizes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ufo
--

ALTER SEQUENCE public.prizes_id_seq OWNED BY public.prizes.id;


--
-- Name: task_statuses; Type: TABLE; Schema: public; Owner: ufo
--

CREATE TABLE public.task_statuses (
    id bigint NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    task_id bigint NOT NULL,
    reply text,
    completed_at timestamp with time zone
);


ALTER TABLE public.task_statuses OWNER TO ufo;

--
-- Name: task_statuses_id_seq; Type: SEQUENCE; Schema: public; Owner: ufo
--

CREATE SEQUENCE public.task_statuses_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.task_statuses_id_seq OWNER TO ufo;

--
-- Name: task_statuses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ufo
--

ALTER SEQUENCE public.task_statuses_id_seq OWNED BY public.task_statuses.id;


--
-- Name: tasks; Type: TABLE; Schema: public; Owner: ufo
--

CREATE TABLE public.tasks (
    id bigint NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    kid_id bigint NOT NULL,
    action text NOT NULL,
    icon bigint DEFAULT 1,
    start_at timestamp with time zone,
    cyclic bigint DEFAULT 0,
    selected_days bigint DEFAULT 0,
    negligible boolean DEFAULT false,
    "deferrable" boolean DEFAULT false,
    max_delay bigint DEFAULT 0,
    completed boolean DEFAULT false
);


ALTER TABLE public.tasks OWNER TO ufo;

--
-- Name: tasks_id_seq; Type: SEQUENCE; Schema: public; Owner: ufo
--

CREATE SEQUENCE public.tasks_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tasks_id_seq OWNER TO ufo;

--
-- Name: tasks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ufo
--

ALTER SEQUENCE public.tasks_id_seq OWNED BY public.tasks.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: ufo
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    first_name text NOT NULL,
    last_name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    role text DEFAULT 'parent'::text,
    parent_id bigint,
    verified boolean DEFAULT false,
    picture text,
    points bigint DEFAULT 0
);


ALTER TABLE public.users OWNER TO ufo;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: ufo
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO ufo;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ufo
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: kid_prizes id; Type: DEFAULT; Schema: public; Owner: ufo
--

ALTER TABLE ONLY public.kid_prizes ALTER COLUMN id SET DEFAULT nextval('public.kid_prizes_id_seq'::regclass);


--
-- Name: message_statuses id; Type: DEFAULT; Schema: public; Owner: ufo
--

ALTER TABLE ONLY public.message_statuses ALTER COLUMN id SET DEFAULT nextval('public.message_statuses_id_seq'::regclass);


--
-- Name: messages id; Type: DEFAULT; Schema: public; Owner: ufo
--

ALTER TABLE ONLY public.messages ALTER COLUMN id SET DEFAULT nextval('public.messages_id_seq'::regclass);


--
-- Name: prizes id; Type: DEFAULT; Schema: public; Owner: ufo
--

ALTER TABLE ONLY public.prizes ALTER COLUMN id SET DEFAULT nextval('public.prizes_id_seq'::regclass);


--
-- Name: task_statuses id; Type: DEFAULT; Schema: public; Owner: ufo
--

ALTER TABLE ONLY public.task_statuses ALTER COLUMN id SET DEFAULT nextval('public.task_statuses_id_seq'::regclass);


--
-- Name: tasks id; Type: DEFAULT; Schema: public; Owner: ufo
--

ALTER TABLE ONLY public.tasks ALTER COLUMN id SET DEFAULT nextval('public.tasks_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: ufo
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: kid_prizes; Type: TABLE DATA; Schema: public; Owner: ufo
--

COPY public.kid_prizes (id, created_at, updated_at, deleted_at, kid_id, prize_id, chosen_at, collected) FROM stdin;
\.


--
-- Data for Name: message_statuses; Type: TABLE DATA; Schema: public; Owner: ufo
--

COPY public.message_statuses (id, created_at, updated_at, deleted_at, recipient_id, message_id, viewed, confirmed) FROM stdin;
\.


--
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: ufo
--

COPY public.messages (id, created_at, updated_at, deleted_at, sender_id, message, need_confirmation) FROM stdin;
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: ufo
--

COPY public.migrations (id) FROM stdin;
201608301431
201608301432
201608301433
201608301434
201608301435
201608301436
201608301437
\.


--
-- Data for Name: prizes; Type: TABLE DATA; Schema: public; Owner: ufo
--

COPY public.prizes (id, created_at, updated_at, deleted_at, kid_id, name, points, icon, one_time, published) FROM stdin;
\.


--
-- Data for Name: task_statuses; Type: TABLE DATA; Schema: public; Owner: ufo
--

COPY public.task_statuses (id, created_at, updated_at, deleted_at, task_id, reply, completed_at) FROM stdin;
\.


--
-- Data for Name: tasks; Type: TABLE DATA; Schema: public; Owner: ufo
--

COPY public.tasks (id, created_at, updated_at, deleted_at, kid_id, action, icon, start_at, cyclic, selected_days, negligible, "deferrable", max_delay, completed) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: ufo
--

COPY public.users (id, created_at, updated_at, deleted_at, first_name, last_name, email, password, role, parent_id, verified, picture, points) FROM stdin;
1	2022-01-02 20:54:27.884327+00	2022-01-02 20:54:27.884327+00	\N	John	Admin	admin@admin.com	$2a$10$pYs2rPQYL7vrYVB/i07WfuHVrGVdEbllPLZAr7IUUWzOqKgOnpvmu	admin	\N	t	\N	0
\.


--
-- Name: kid_prizes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ufo
--

SELECT pg_catalog.setval('public.kid_prizes_id_seq', 1, false);


--
-- Name: message_statuses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ufo
--

SELECT pg_catalog.setval('public.message_statuses_id_seq', 1, false);


--
-- Name: messages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ufo
--

SELECT pg_catalog.setval('public.messages_id_seq', 1, false);


--
-- Name: prizes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ufo
--

SELECT pg_catalog.setval('public.prizes_id_seq', 1, false);


--
-- Name: task_statuses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ufo
--

SELECT pg_catalog.setval('public.task_statuses_id_seq', 1, false);


--
-- Name: tasks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ufo
--

SELECT pg_catalog.setval('public.tasks_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ufo
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- Name: kid_prizes kid_prizes_pkey; Type: CONSTRAINT; Schema: public; Owner: ufo
--

ALTER TABLE ONLY public.kid_prizes
    ADD CONSTRAINT kid_prizes_pkey PRIMARY KEY (id);


--
-- Name: message_statuses message_statuses_pkey; Type: CONSTRAINT; Schema: public; Owner: ufo
--

ALTER TABLE ONLY public.message_statuses
    ADD CONSTRAINT message_statuses_pkey PRIMARY KEY (id);


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: ufo
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: ufo
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- Name: prizes prizes_pkey; Type: CONSTRAINT; Schema: public; Owner: ufo
--

ALTER TABLE ONLY public.prizes
    ADD CONSTRAINT prizes_pkey PRIMARY KEY (id);


--
-- Name: task_statuses task_statuses_pkey; Type: CONSTRAINT; Schema: public; Owner: ufo
--

ALTER TABLE ONLY public.task_statuses
    ADD CONSTRAINT task_statuses_pkey PRIMARY KEY (id);


--
-- Name: tasks tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: ufo
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: ufo
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: ufo
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: idx_kid_prizes_deleted_at; Type: INDEX; Schema: public; Owner: ufo
--

CREATE INDEX idx_kid_prizes_deleted_at ON public.kid_prizes USING btree (deleted_at);


--
-- Name: idx_kid_prizes_kid_id; Type: INDEX; Schema: public; Owner: ufo
--

CREATE INDEX idx_kid_prizes_kid_id ON public.kid_prizes USING btree (kid_id);


--
-- Name: idx_kid_prizes_prize_id; Type: INDEX; Schema: public; Owner: ufo
--

CREATE INDEX idx_kid_prizes_prize_id ON public.kid_prizes USING btree (prize_id);


--
-- Name: idx_message_statuses_deleted_at; Type: INDEX; Schema: public; Owner: ufo
--

CREATE INDEX idx_message_statuses_deleted_at ON public.message_statuses USING btree (deleted_at);


--
-- Name: idx_message_statuses_message_id; Type: INDEX; Schema: public; Owner: ufo
--

CREATE INDEX idx_message_statuses_message_id ON public.message_statuses USING btree (message_id);


--
-- Name: idx_message_statuses_recipient_id; Type: INDEX; Schema: public; Owner: ufo
--

CREATE INDEX idx_message_statuses_recipient_id ON public.message_statuses USING btree (recipient_id);


--
-- Name: idx_messages_deleted_at; Type: INDEX; Schema: public; Owner: ufo
--

CREATE INDEX idx_messages_deleted_at ON public.messages USING btree (deleted_at);


--
-- Name: idx_messages_sender_id; Type: INDEX; Schema: public; Owner: ufo
--

CREATE INDEX idx_messages_sender_id ON public.messages USING btree (sender_id);


--
-- Name: idx_prizes_deleted_at; Type: INDEX; Schema: public; Owner: ufo
--

CREATE INDEX idx_prizes_deleted_at ON public.prizes USING btree (deleted_at);


--
-- Name: idx_prizes_kid_id; Type: INDEX; Schema: public; Owner: ufo
--

CREATE INDEX idx_prizes_kid_id ON public.prizes USING btree (kid_id);


--
-- Name: idx_task_statuses_deleted_at; Type: INDEX; Schema: public; Owner: ufo
--

CREATE INDEX idx_task_statuses_deleted_at ON public.task_statuses USING btree (deleted_at);


--
-- Name: idx_task_statuses_task_id; Type: INDEX; Schema: public; Owner: ufo
--

CREATE INDEX idx_task_statuses_task_id ON public.task_statuses USING btree (task_id);


--
-- Name: idx_tasks_deleted_at; Type: INDEX; Schema: public; Owner: ufo
--

CREATE INDEX idx_tasks_deleted_at ON public.tasks USING btree (deleted_at);


--
-- Name: idx_tasks_kid_id; Type: INDEX; Schema: public; Owner: ufo
--

CREATE INDEX idx_tasks_kid_id ON public.tasks USING btree (kid_id);


--
-- Name: idx_users_deleted_at; Type: INDEX; Schema: public; Owner: ufo
--

CREATE INDEX idx_users_deleted_at ON public.users USING btree (deleted_at);


--
-- Name: idx_users_parent_id; Type: INDEX; Schema: public; Owner: ufo
--

CREATE INDEX idx_users_parent_id ON public.users USING btree (parent_id);


--
-- Name: kid_prizes fk_kid_prizes_kid; Type: FK CONSTRAINT; Schema: public; Owner: ufo
--

ALTER TABLE ONLY public.kid_prizes
    ADD CONSTRAINT fk_kid_prizes_kid FOREIGN KEY (kid_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: kid_prizes fk_kid_prizes_prize; Type: FK CONSTRAINT; Schema: public; Owner: ufo
--

ALTER TABLE ONLY public.kid_prizes
    ADD CONSTRAINT fk_kid_prizes_prize FOREIGN KEY (prize_id) REFERENCES public.prizes(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: message_statuses fk_message_statuses_message; Type: FK CONSTRAINT; Schema: public; Owner: ufo
--

ALTER TABLE ONLY public.message_statuses
    ADD CONSTRAINT fk_message_statuses_message FOREIGN KEY (message_id) REFERENCES public.messages(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: message_statuses fk_message_statuses_recipient; Type: FK CONSTRAINT; Schema: public; Owner: ufo
--

ALTER TABLE ONLY public.message_statuses
    ADD CONSTRAINT fk_message_statuses_recipient FOREIGN KEY (recipient_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: messages fk_messages_sender; Type: FK CONSTRAINT; Schema: public; Owner: ufo
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT fk_messages_sender FOREIGN KEY (sender_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: prizes fk_prizes_kid; Type: FK CONSTRAINT; Schema: public; Owner: ufo
--

ALTER TABLE ONLY public.prizes
    ADD CONSTRAINT fk_prizes_kid FOREIGN KEY (kid_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: task_statuses fk_task_statuses_task; Type: FK CONSTRAINT; Schema: public; Owner: ufo
--

ALTER TABLE ONLY public.task_statuses
    ADD CONSTRAINT fk_task_statuses_task FOREIGN KEY (task_id) REFERENCES public.tasks(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: tasks fk_tasks_kid; Type: FK CONSTRAINT; Schema: public; Owner: ufo
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT fk_tasks_kid FOREIGN KEY (kid_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: users fk_users_parent; Type: FK CONSTRAINT; Schema: public; Owner: ufo
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT fk_users_parent FOREIGN KEY (parent_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

