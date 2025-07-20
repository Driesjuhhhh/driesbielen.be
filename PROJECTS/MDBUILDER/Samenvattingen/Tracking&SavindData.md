# Tracking and Saving Data

EF Core biedt ingebouwde logging waarmee je:
* `SQL-queries` die naar de database gaan kunt `bekijken`
* Activiteit van de `ChangeTracker`, transacties en database-interacties kunt volgen
* Zelf bepaalt hoeveel details je `logt` en welke categorieën

## Logging

**Voorbeeld**

```
using Microsoft.Extensions.Logging;

protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
{
    optionsBuilder
        .UseSqlServer("Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=MyDatabase")
        .LogTo(
            message => Debug.WriteLine(message), // of Console.WriteLine
            new[] { DbLoggerCategory.Database.Command.Name }, // Filter op SQL-queries
            LogLevel.Information // Alleen informatieniveau loggen
        )
        .EnableSensitiveDataLogging(); // Toon ook parameterwaarden (alleen voor dev!)
}
```
**Uitkomst**

```
Executed DbCommand (1ms) [Parameters=[@__p_0='1'], CommandType='Text']
SELECT TOP(1) [a].[Id], [a].[FirstName], [a].[LastName]
FROM [Authors] AS [a]
WHERE [a].[LastName] = @__p_0
```

Standaard worden parameterwaarden verborgen in logs

```
WHERE [a].[LastName] = ?
```
Als je geveolige data wel wil tonen tijdens debuggen gebruik: `.EnableSensitiveDataLogging();`

```
WHERE [a].[LastName] = 'Lerman'
```
Je kunt op verschillende manieren loggen

| Doel              | Voorbeeld                               |
| ----------------- | --------------------------------------- |
| Console           | `Console.WriteLine(message)`            |
| Debug window      | `Debug.WriteLine(message)`              |
| Bestand (log.txt) | `new StreamWriter("log.txt")`           |
| Andere logger     | integratie met eigen logging-frameworks |

```
var writer = new StreamWriter("ef-logs.txt", append: true);
optionsBuilder.LogTo(writer.WriteLine);
```

## Tracking

Een DbContext doet meer dan SQL uitvoeren:

* Zodra je een object uit de database haalt, wordt het getrackt.
* Dat gebeurt via de `ChangeTracker` met EntityEntry-objecten.

**Wat is tracking en hoe werkt het?**

EF Core gebruikt EntityEntry-objecten om entiteiten te volgen.

Elke entity krijgt een `state`: Unchanged, Added, Modified, Deleted.

Bij SaveChanges() kijkt EF naar deze status om te bepalen:
* INSERT bij Added
* UPDATE bij Modified
* DELETE bij Deleted

```
var author = new Author { FirstName = "Julie", LastName = "Lerman" };
context.Authors.Add(author); // State = Added
context.SaveChanges();       // INSERT + nieuwe Id toegekend
```

**Wat doet EF Core intern?**

EF gebruikt een ChangeTracker die elke getrackte entity observeert via een EntityEntry.
Elke entity heeft een status (Unchanged, Modified, Added, Deleted).

Bij SaveChanges() wordt intern automatisch DetectChanges() aangeroepen.

**Wat doet DetectChanges()?**

```
context.ChangeTracker.DetectChanges();
```

* Controleert de actuele waarden van objecten
* Bepaalt of iets gewijzigd is
* Past de state van elk EntityEntry aan

```
context.ChangeTracker.DetectChanges(); // Handmatig aanroepen indien nodig
Console.WriteLine(context.ChangeTracker.DebugView.ShortView);
```