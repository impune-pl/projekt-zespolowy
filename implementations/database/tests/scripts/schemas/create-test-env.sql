--
-- PostgreSQL database dump
--

-- Dumped from database version 13.1 (Ubuntu 13.1-1.pgdg20.04+1)
-- Dumped by pg_dump version 13.1 (Ubuntu 13.1-1.pgdg20.04+1)

-- Started on 2021-01-21 15:48:43 UTC

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

--
-- TOC entry 211 (class 1255 OID 16475)
-- Name: OnContactUpdate(); Type: FUNCTION; Schema: public; Owner: admin
--

CREATE FUNCTION test."OnContactUpdate"() RETURNS trigger
    LANGUAGE plpgsql STRICT
    AS $$
BEGIN
	IF OLD."isAccepted" = FALSE AND NEW."isAccepted" = TRUE THEN
		INSERT INTO "Contacts"("userId","contactId","isLocationShared","isBlocked","isAccepted")
		VALUES (OLD."contactId", OLD."userId", false, false, true);
	END IF;
	return NEW;
END;
$$;


ALTER FUNCTION test."OnContactUpdate"() OWNER TO admin;

--
-- TOC entry 210 (class 1255 OID 16479)
-- Name: OnUserUpdate(); Type: FUNCTION; Schema: public; Owner: admin
--

CREATE FUNCTION test."OnUserUpdate"() RETURNS trigger
    LANGUAGE plpgsql STABLE STRICT
    AS $$
BEGIN
	IF NEW."lastLocation" != OLD."lastLocation" THEN
		NEW."lastLocationTimestamp" = LOCALTIMESTAMP;
	END IF;
	return NEW;
END;
$$;


ALTER FUNCTION test."OnUserUpdate"() OWNER TO admin;

--
-- TOC entry 212 (class 1255 OID 16486)
-- Name: RemoveExpiredTokensByTimestamps(); Type: FUNCTION; Schema: public; Owner: admin
--

CREATE FUNCTION test."RemoveExpiredTokensByTimestamps"() RETURNS void
    LANGUAGE sql
    AS $$
DELETE FROM "Tokens"
WHERE "Tokens"."expirationTimestamp" < localtimestamp
$$;


ALTER FUNCTION test."RemoveExpiredTokensByTimestamps"() OWNER TO admin;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 205 (class 1259 OID 16417)
-- Name: Contacts; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE test."Contacts" (
    id bigint NOT NULL,
    "userId" bigint NOT NULL,
    "contactId" bigint NOT NULL,
    "isLocationShared" boolean DEFAULT false NOT NULL,
    "isBlocked" boolean DEFAULT false NOT NULL,
    "isAccepted" boolean DEFAULT false NOT NULL
);


ALTER TABLE test."Contacts" OWNER TO admin;

--
-- TOC entry 204 (class 1259 OID 16415)
-- Name: Contacts_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE test."Contacts_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE test."Contacts_id_seq" OWNER TO admin;

--
-- TOC entry 3023 (class 0 OID 0)
-- Dependencies: 204
-- Name: Contacts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE test."Contacts_id_seq" OWNED BY test."Contacts".id;


--
-- TOC entry 201 (class 1259 OID 16388)
-- Name: MessageTypes; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE test."MessageTypes" (
    id bigint NOT NULL,
    type character varying(255) NOT NULL
);


ALTER TABLE test."MessageTypes" OWNER TO admin;

--
-- TOC entry 200 (class 1259 OID 16386)
-- Name: MessageTypes_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE test."MessageTypes_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE test."MessageTypes_id_seq" OWNER TO admin;

--
-- TOC entry 3024 (class 0 OID 0)
-- Dependencies: 200
-- Name: MessageTypes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE test."MessageTypes_id_seq" OWNED BY test."MessageTypes".id;


--
-- TOC entry 203 (class 1259 OID 16396)
-- Name: Messages; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE test."Messages" (
    id bigint NOT NULL,
    "contactId" bigint NOT NULL,
    "typeId" bigint NOT NULL,
    content text NOT NULL,
    "time" timestamp without time zone DEFAULT LOCALTIMESTAMP NOT NULL
);


ALTER TABLE test."Messages" OWNER TO admin;

--
-- TOC entry 202 (class 1259 OID 16394)
-- Name: Messages_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE test."Messages_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE test."Messages_id_seq" OWNER TO admin;

--
-- TOC entry 3025 (class 0 OID 0)
-- Dependencies: 202
-- Name: Messages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE test."Messages_id_seq" OWNED BY test."Messages".id;


--
-- TOC entry 209 (class 1259 OID 16439)
-- Name: Tokens; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE test."Tokens" (
    id bigint NOT NULL,
    "userId" bigint NOT NULL,
    token character varying(512) NOT NULL,
    "generatedTimestamp" timestamp without time zone DEFAULT LOCALTIMESTAMP NOT NULL,
    "expirationTimestamp" timestamp without time zone DEFAULT (LOCALTIMESTAMP + '30 days'::interval) NOT NULL,
    "isExpired" boolean DEFAULT false NOT NULL
);


ALTER TABLE test."Tokens" OWNER TO admin;

--
-- TOC entry 208 (class 1259 OID 16437)
-- Name: Tokens_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE test."Tokens_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE test."Tokens_id_seq" OWNER TO admin;

--
-- TOC entry 3026 (class 0 OID 0)
-- Dependencies: 208
-- Name: Tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE test."Tokens_id_seq" OWNED BY test."Tokens".id;


--
-- TOC entry 207 (class 1259 OID 16428)
-- Name: Users; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE test."Users" (
    id bigint NOT NULL,
    "phoneNumber" character varying(15) NOT NULL,
    email character varying(255) NOT NULL,
    "passwordHash" character varying(128) NOT NULL,
    "lastLocation" character varying(255),
    "lastLocationTimestamp" timestamp without time zone,
    "lastLoginTimestamp" timestamp without time zone
);


ALTER TABLE test."Users" OWNER TO admin;

--
-- TOC entry 206 (class 1259 OID 16426)
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE test."Users_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE test."Users_id_seq" OWNER TO admin;

--
-- TOC entry 3027 (class 0 OID 0)
-- Dependencies: 206
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE test."Users_id_seq" OWNED BY test."Users".id;


--
-- TOC entry 2853 (class 2604 OID 16420)
-- Name: Contacts id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY test."Contacts" ALTER COLUMN id SET DEFAULT nextval('test."Contacts_id_seq"'::regclass);


--
-- TOC entry 2850 (class 2604 OID 16391)
-- Name: MessageTypes id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY test."MessageTypes" ALTER COLUMN id SET DEFAULT nextval('test."MessageTypes_id_seq"'::regclass);


--
-- TOC entry 2851 (class 2604 OID 16399)
-- Name: Messages id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY test."Messages" ALTER COLUMN id SET DEFAULT nextval('test."Messages_id_seq"'::regclass);


--
-- TOC entry 2860 (class 2604 OID 16442)
-- Name: Tokens id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY test."Tokens" ALTER COLUMN id SET DEFAULT nextval('test."Tokens_id_seq"'::regclass);


--
-- TOC entry 2857 (class 2604 OID 16431)
-- Name: Users id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY test."Users" ALTER COLUMN id SET DEFAULT nextval('test."Users_id_seq"'::regclass);


--
-- TOC entry 2874 (class 2606 OID 16425)
-- Name: Contacts Contacts_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY test."Contacts"
    ADD CONSTRAINT "Contacts_pkey" PRIMARY KEY (id);


--
-- TOC entry 2866 (class 2606 OID 16413)
-- Name: MessageTypes MessageTypes_id_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY test."MessageTypes"
    ADD CONSTRAINT "MessageTypes_id_key" UNIQUE (id);


--
-- TOC entry 2868 (class 2606 OID 16393)
-- Name: MessageTypes MessageTypes_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY test."MessageTypes"
    ADD CONSTRAINT "MessageTypes_pkey" PRIMARY KEY (id);


--
-- TOC entry 2870 (class 2606 OID 16411)
-- Name: Messages Messages_id_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY test."Messages"
    ADD CONSTRAINT "Messages_id_key" UNIQUE (id);


--
-- TOC entry 2872 (class 2606 OID 16404)
-- Name: Messages Messages_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY test."Messages"
    ADD CONSTRAINT "Messages_pkey" PRIMARY KEY (id);


--
-- TOC entry 2864 (class 2606 OID 16487)
-- Name: Tokens Tokens_expirationTimestamp_check; Type: CHECK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE test."Tokens"
    ADD CONSTRAINT "Tokens_expirationTimestamp_check" CHECK (("expirationTimestamp" > LOCALTIMESTAMP)) NOT VALID;


--
-- TOC entry 2878 (class 2606 OID 16447)
-- Name: Tokens Tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY test."Tokens"
    ADD CONSTRAINT "Tokens_pkey" PRIMARY KEY (id);


--
-- TOC entry 2876 (class 2606 OID 16436)
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY test."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- TOC entry 2858 (class 2606 OID 16484)
-- Name: Users email; Type: CHECK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE test."Users"
    ADD CONSTRAINT email CHECK (((email)::text ~ '^[a-zA-Z0-9.!#$%&''*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$'::text)) NOT VALID;


--
-- TOC entry 2859 (class 2606 OID 16485)
-- Name: Users phoneNumber; Type: CHECK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE test."Users"
    ADD CONSTRAINT "phoneNumber" CHECK ((("phoneNumber")::text ~ '^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$'::text)) NOT VALID;


--
-- TOC entry 2880 (class 2606 OID 16483)
-- Name: Tokens token; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY test."Tokens"
    ADD CONSTRAINT token UNIQUE (token);


--
-- TOC entry 2886 (class 2620 OID 16476)
-- Name: Contacts OnContactUpdate; Type: TRIGGER; Schema: public; Owner: admin
--

CREATE TRIGGER "OnContactUpdate" AFTER UPDATE OF "isAccepted" ON test."Contacts" FOR EACH ROW EXECUTE FUNCTION test."OnContactUpdate"();


--
-- TOC entry 2887 (class 2620 OID 16480)
-- Name: Users OnUserUpdate; Type: TRIGGER; Schema: public; Owner: admin
--

CREATE TRIGGER "OnUserUpdate" BEFORE UPDATE OF "lastLocation" ON test."Users" FOR EACH ROW EXECUTE FUNCTION test."OnUserUpdate"();


--
-- TOC entry 2883 (class 2606 OID 16462)
-- Name: Contacts Contacts_contactId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY test."Contacts"
    ADD CONSTRAINT "Contacts_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES test."Users"(id) NOT VALID;


--
-- TOC entry 2884 (class 2606 OID 16467)
-- Name: Contacts Contacts_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY test."Contacts"
    ADD CONSTRAINT "Contacts_userId_fkey" FOREIGN KEY ("userId") REFERENCES test."Users"(id) NOT VALID;


--
-- TOC entry 2882 (class 2606 OID 16449)
-- Name: Messages Messages_contactId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY test."Messages"
    ADD CONSTRAINT "Messages_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES test."Contacts"(id) NOT VALID;


--
-- TOC entry 2881 (class 2606 OID 16405)
-- Name: Messages Messages_typeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY test."Messages"
    ADD CONSTRAINT "Messages_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES test."MessageTypes"(id) MATCH FULL;


--
-- TOC entry 2885 (class 2606 OID 16457)
-- Name: Tokens Tokens_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY test."Tokens"
    ADD CONSTRAINT "Tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES test."Users"(id) NOT VALID;


-- Completed on 2021-01-21 15:48:43 UTC

--
-- PostgreSQL database dump complete
--

