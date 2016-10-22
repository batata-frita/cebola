
## Data Structures

The nodes will have the types:

```javascript
type User = {
  handler: string,
  id: number,
}

type Repo = {
  handler: string,
  id: number
}

type Org = {
  handler: string,
  id: number
}
```

## Relationships

```javascript
type follows = [User, User]

type belongsTo = [User, Org]

type has = [Org, Repo]
```

## Constraints

http://blog.armbruster-it.de/2013/12/indexing-in-neo4j-an-overview/

```cypher
CREATE CONSTRAINT ON (p:User) ASSERT p.handler IS UNIQUE
```

**All**

```
MATCH (n) RETURN n LIMIT 100
```

**Cyclic**

```
MATCH (a:User), (b:User) WHERE (a)-[:FOLLOWS]->(b) AND (b)-[:FOLLOWS]->(a) RETURN a, b
```

**Delete**

```
MATCH (n) DETACH
DELETE n
```
