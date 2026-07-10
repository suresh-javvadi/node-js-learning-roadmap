# Episode 09: Databases (SQL & NoSQL)

## What is a Database?

A **database** is an organized collection of data.

## Types of Databases

There are many types of databases. A few of them are below:

- **Relational databases**: MySQL, PostgreSQL
- **NoSQL database**: MongoDB
- **In-memory database**: Redis
- **Cloud DB**: Amazon RDS
- **Distributed SQL database**: CockroachDB

## DBMS

A **DBMS (Database Management System)** is the software that interacts with end users, applications, and the database itself.

## Relational Databases

- **RDBMS** is the DBMS software for relational databases. It uses the **Structured Query Language (SQL)**.
- It has tables, and each table has **rows and columns** to store data.
- It stores **structured data** with a **fixed schema**.
- Relational databases maintain each table for a specific purpose and join multiple tables for the connections using ids.

## NoSQL Databases

- NoSQL stands for **"Not Only SQL"** and is used for **non-relational databases** (also called NoSQL databases).
- It has **collections**, each collection has **documents**, and a document is like a JS object or JSON. Each document has **fields** to store the data.
- It stores **unstructured data** with a **flexible schema**.
- There is no need for joins or data normalization.

### NoSQL Sub-types

NoSQL databases can be classified into these main types:

- **Document databases**
- **Key-Value databases**
- **Graph databases**
- **Wide-Column databases**
- **Multi-Model databases**

Relational databases ensure data integrity through **ACID properties**, which makes them well suited for applications that need robust, reliable transactions (such as banking systems).

## RDBMS vs NoSQL

| Feature | RDBMS (Relational Database) | NoSQL (Document Database) |
| --- | --- | --- |
| Table Structure | Tables with rows and columns | Collections with documents |
| Data Organization | Structured data in tables | Flexible, schema-less documents |
| Schema | Fixed schema, predefined | Schema-less, flexible |
| Query Language | SQL | NoSQL queries (varies by database) |
| Scaling | Tough horizontal scaling | Easier horizontal scaling |
| Relationships | Foreign keys and joins | Embedded documents, arrays |
| Use Case | Read-heavy apps, transaction workloads | Flexible data models, high-performance apps |
| Examples | Banking apps, ERP systems | Content management systems, real-time analytics |
