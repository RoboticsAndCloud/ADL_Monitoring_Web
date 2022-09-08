--
-- PostgreSQL database dump
--

-- Dumped from database version 14.3 (Debian 14.3-1.pgdg110+1)
-- Dumped by pg_dump version 14.3 (Debian 14.3-1.pgdg110+1)

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
-- Name: Questions; Type: TABLE; Schema: public; Owner: YOUR_CUSTOM_USER
--

CREATE TABLE public."Questions" (
    id integer NOT NULL,
    content text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone,
    choices text,
    "correctAnswer" text
);


ALTER TABLE public."Questions" OWNER TO "YOUR_CUSTOM_USER";

--
-- Name: Questions_id_seq; Type: SEQUENCE; Schema: public; Owner: YOUR_CUSTOM_USER
--

CREATE SEQUENCE public."Questions_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Questions_id_seq" OWNER TO "YOUR_CUSTOM_USER";

--
-- Name: Questions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: YOUR_CUSTOM_USER
--

ALTER SEQUENCE public."Questions_id_seq" OWNED BY public."Questions".id;


--
-- Name: Teams; Type: TABLE; Schema: public; Owner: YOUR_CUSTOM_USER
--

CREATE TABLE public."Teams" (
    id integer NOT NULL,
    name text NOT NULL,
    score integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone
);


ALTER TABLE public."Teams" OWNER TO "YOUR_CUSTOM_USER";

--
-- Name: Teams_id_seq; Type: SEQUENCE; Schema: public; Owner: YOUR_CUSTOM_USER
--

CREATE SEQUENCE public."Teams_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Teams_id_seq" OWNER TO "YOUR_CUSTOM_USER";

--
-- Name: Teams_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: YOUR_CUSTOM_USER
--

ALTER SEQUENCE public."Teams_id_seq" OWNED BY public."Teams".id;


--
-- Name: Users; Type: TABLE; Schema: public; Owner: YOUR_CUSTOM_USER
--

CREATE TABLE public."Users" (
    id integer NOT NULL,
    email text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone
);


ALTER TABLE public."Users" OWNER TO "YOUR_CUSTOM_USER";

--
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: YOUR_CUSTOM_USER
--

CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Users_id_seq" OWNER TO "YOUR_CUSTOM_USER";

--
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: YOUR_CUSTOM_USER
--

ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: YOUR_CUSTOM_USER
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO "YOUR_CUSTOM_USER";

--
-- Name: adl_activity_data; Type: TABLE; Schema: public; Owner: YOUR_CUSTOM_USER
--

CREATE TABLE public.adl_activity_data (
    id bigint NOT NULL,
    activity text NOT NULL,
    "time" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    image_source text NOT NULL,
    sound_source text NOT NULL,
    motion_source text NOT NULL,
    comment text NOT NULL
);


ALTER TABLE public.adl_activity_data OWNER TO "YOUR_CUSTOM_USER";

--
-- Name: adl_activity_data_id_seq; Type: SEQUENCE; Schema: public; Owner: YOUR_CUSTOM_USER
--

CREATE SEQUENCE public.adl_activity_data_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.adl_activity_data_id_seq OWNER TO "YOUR_CUSTOM_USER";

--
-- Name: adl_activity_data_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: YOUR_CUSTOM_USER
--

ALTER SEQUENCE public.adl_activity_data_id_seq OWNED BY public.adl_activity_data.id;


--
-- Name: Questions id; Type: DEFAULT; Schema: public; Owner: YOUR_CUSTOM_USER
--

ALTER TABLE ONLY public."Questions" ALTER COLUMN id SET DEFAULT nextval('public."Questions_id_seq"'::regclass);


--
-- Name: Teams id; Type: DEFAULT; Schema: public; Owner: YOUR_CUSTOM_USER
--

ALTER TABLE ONLY public."Teams" ALTER COLUMN id SET DEFAULT nextval('public."Teams_id_seq"'::regclass);


--
-- Name: Users id; Type: DEFAULT; Schema: public; Owner: YOUR_CUSTOM_USER
--

ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);


--
-- Name: adl_activity_data id; Type: DEFAULT; Schema: public; Owner: YOUR_CUSTOM_USER
--

ALTER TABLE ONLY public.adl_activity_data ALTER COLUMN id SET DEFAULT nextval('public.adl_activity_data_id_seq'::regclass);


--
-- Name: Questions Questions_pkey; Type: CONSTRAINT; Schema: public; Owner: YOUR_CUSTOM_USER
--

ALTER TABLE ONLY public."Questions"
    ADD CONSTRAINT "Questions_pkey" PRIMARY KEY (id);


--
-- Name: Teams Teams_pkey; Type: CONSTRAINT; Schema: public; Owner: YOUR_CUSTOM_USER
--

ALTER TABLE ONLY public."Teams"
    ADD CONSTRAINT "Teams_pkey" PRIMARY KEY (id);


--
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: YOUR_CUSTOM_USER
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: YOUR_CUSTOM_USER
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: adl_activity_data adl_activity_data_pkey; Type: CONSTRAINT; Schema: public; Owner: YOUR_CUSTOM_USER
--

ALTER TABLE ONLY public.adl_activity_data
    ADD CONSTRAINT adl_activity_data_pkey PRIMARY KEY (id);


--
-- Name: adl_activity_data adl_activity_data_time_key; Type: CONSTRAINT; Schema: public; Owner: YOUR_CUSTOM_USER
--

ALTER TABLE ONLY public.adl_activity_data
    ADD CONSTRAINT adl_activity_data_time_key UNIQUE ("time");


--
-- Name: Users_email_key; Type: INDEX; Schema: public; Owner: YOUR_CUSTOM_USER
--

CREATE UNIQUE INDEX "Users_email_key" ON public."Users" USING btree (email);


--
-- Name: activity_key; Type: INDEX; Schema: public; Owner: YOUR_CUSTOM_USER
--

CREATE INDEX activity_key ON public.adl_activity_data USING btree (activity);


--
-- PostgreSQL database dump complete
--
