---
layout: post
title: "Partitioning in PostgreSQL: What, Why, and How"
categories:
- programming
tags:
- SQL
- Programming
- Partition
- Partitioning
- PostgreSQL
---

PostgreSQL is a powerful and popular open-source relational database management system that can handle large and complex datasets. However, as the size and complexity of the data grows, so do the challenges of managing and querying it efficiently. One of the techniques that can help overcome these challenges is partitioning.

Partitioning is a process of dividing a large table into smaller and more manageable pieces called partitions. Each partition is a separate table that stores a subset of the data, based on some criteria. For example, a table that contains sales data can be partitioned by date, so that each month's data is stored in a different partition.

Partitioning can provide several benefits, such as:

- **Improved query performance:** By reducing the amount of data that needs to be scanned for a given query, partitioning can speed up the query execution time. For instance, if we want to query the sales data for a specific month, we only need to scan the corresponding partition, instead of the whole table.
- **Easier data management:** Partitioning can simplify the data maintenance tasks, such as archiving or deleting old data. We can drop or detach entire partitions without affecting the rest of the table, which is faster and more efficient than deleting individual rows.
- **Parallel query processing:** PostgreSQL can execute queries in parallel across multiple partitions, leveraging the processing power of multiple cores or servers. This can further improve the query performance, especially for complex queries that involve multiple partitions.
- **Efficient indexing:** Partitioning allows for more focused and effective indexing. Indexes on smaller partitions are generally more compact and faster to search than indexes on the whole table.
- **Space optimization:** Partitioning can help optimize the storage space by segregating frequently accessed data from less frequently accessed data. We can store different partitions on different storage media, depending on their usage patterns.

## Types of Partitioning in PostgreSQL

PostgreSQL supports four types of partitioning methods: range, list, hash, and composite. Each method defines how the data is distributed among the partitions, based on the partition key. The partition key is a column or a set of columns that determines which partition a row belongs to.

### Range Partitioning

Range partitioning is a method that divides the table into partitions based on a range of values of the partition key. This method is commonly used for partitioning by date, number, or other ordered values. For example, we can partition the sales table by date ranges, so that each partition contains the data for one month.

To create a range-partitioned table, we need to use the `PARTITION BY RANGE` clause in the `CREATE TABLE` statement, and specify the partition key. Then, we need to create each partition using the `CREATE TABLE` statement with the `PARTITION OF` clause, and specify the range of values for each partition using the `FOR VALUES FROM ... TO ...` clause. For example, the following statements create a range-partitioned table called `sales` with three partitions:

```sql
CREATE TABLE sales (
  id serial PRIMARY KEY,
  date date NOT NULL,
  amount numeric NOT NULL
) PARTITION BY RANGE (date);

CREATE TABLE sales_2020_01 PARTITION OF sales
  FOR VALUES FROM ('2020-01-01') TO ('2020-02-01');

CREATE TABLE sales_2020_02 PARTITION OF sales
  FOR VALUES FROM ('2020-02-01') TO ('2020-03-01');

CREATE TABLE sales_2020_03 PARTITION OF sales
  FOR VALUES FROM ('2020-03-01') TO ('2020-04-01');
```

Note that the range bounds are inclusive at the lower end and exclusive at the upper end. For example, the partition `sales_2020_01` contains the data for January 2020, but not for February 2020.

### List Partitioning

List partitioning is a method that divides the table into partitions based on a list of values of the partition key. This method is useful for partitioning by categorical or discrete values, such as country, product type, or customer segment. For example, we can partition the sales table by country, so that each partition contains the data for one country.

To create a list-partitioned table, we need to use the `PARTITION BY LIST` clause in the `CREATE TABLE` statement, and specify the partition key. Then, we need to create each partition using the `CREATE TABLE` statement with the `PARTITION OF` clause, and specify the list of values for each partition using the `FOR VALUES IN (...)` clause. For example, the following statements create a list-partitioned table called `sales` with four partitions:

```sql
CREATE TABLE sales (
  id serial PRIMARY KEY,
  date date NOT NULL,
  country text NOT NULL,
  amount numeric NOT NULL
) PARTITION BY LIST (country);

CREATE TABLE sales_usa PARTITION OF sales
  FOR VALUES IN ('USA');

CREATE TABLE sales_uk PARTITION OF sales
  FOR VALUES IN ('UK');

CREATE TABLE sales_india PARTITION OF sales
  FOR VALUES IN ('India');

CREATE TABLE sales_other PARTITION OF sales
  FOR VALUES IN ('Canada', 'Australia', 'China');
```

Note that the list of values for each partition must not overlap, and must cover all the possible values of the partition key. Alternatively, we can create a default partition that holds all the values that do not match any of the specified partitions, using the `FOR VALUES DEFAULT` clause.

### Hash Partitioning

Hash partitioning is a method that divides the table into partitions based on a hash value of the partition key. This method is suitable for partitioning by a random or arbitrary value, such as an ID or a hash. For example, we can partition the sales table by a hash value of the ID, so that the data is evenly distributed among the partitions.

To create a hash-partitioned table, we need to use the `PARTITION BY HASH` clause in the `CREATE TABLE` statement, and specify the partition key. Then, we need to create each partition using the `CREATE TABLE` statement with the `PARTITION OF` clause, and specify the modulus and remainder for each partition using the `FOR VALUES WITH (modulus ..., remainder ...)` clause. For example, the following statements create a hash-partitioned table called `sales` with four partitions:

```sql
CREATE TABLE sales (
  id serial PRIMARY KEY,
  date date NOT NULL,
  amount numeric NOT NULL
) PARTITION BY HASH (id);

CREATE TABLE sales_0 PARTITION OF sales
  FOR VALUES WITH (modulus 4, remainder 0);

CREATE TABLE sales_1 PARTITION OF sales
  FOR VALUES WITH (modulus 4, remainder 1);

CREATE TABLE sales_2 PARTITION OF sales
  FOR VALUES WITH (modulus 4, remainder 2);

CREATE TABLE sales_3 PARTITION OF sales
  FOR VALUES WITH (modulus 4, remainder 3);
```

Note that the modulus and remainder for each partition must be non-negative integers, and the modulus must be the same for all partitions. The remainder must be less than the modulus, and must not be repeated for different partitions.

## Conclusion

To summarize, partitioning in PostgreSQL is a powerful technique that can help us manage and query large and complex data more efficiently. However, it also requires us to carefully choose the partitioning method, the partition key, and the index strategy that best suit our data and application needs. By doing so, we can leverage the benefits of partitioning, such as improved query performance, easier data management, parallel query processing, efficient indexing, and space optimization.
