# Entity Framework: Introductie

![alt text](images/image-13.png)

**Wat is EF Core?**

EF Core is een officiële .NET-tool van Microsoft voor eenvoudige en consistente data-access via objecten. Het werkt op alle platforms en in Docker. Als ORM zet het automatisch klassen om naar databasetabellen en SQL, wat zorgt voor minder code, meer productiviteit en flexibiliteit in mappings.

EF Core ondersteunt verbindingen met verschillende databronnen, vooral relationele databases. Microsoft biedt providers voor onder andere SQL Server, SQLite, in-memory tests en Cosmos DB. Daarnaast zijn er ook veel derde partij-providers beschikbaar, zowel commercieel als open source.

**Wat is ORM?**

ORM staat voor Object-Relational Mapper. Het is een technologie die helpt bij het koppelen van objecten in je code (zoals klassen) aan tabellen in een relationele database.

## Opbouw van een EF Core application

**TIP!!!**: Via context.Database.EnsureCreated() wordt de database (PubDatabase) automatisch aangemaakt.

```
using (PubContext context = new PubContext())
{
    context.Database.EnsureCreated();
}
```

### Waarschijnlijk niet op examen omdat je werkt met DI containers in program.cs of app.xaml.

**Belang van using met voorbeeld:**

en `DbContext` beheert de verbinding met de database. Omdat deze klasse `IDisposable` implementeert, is het belangrijk om die connectie op het juiste moment vrij te geven. Dat gebeurt automatisch met een `using-blok`.

```
using (var context = new PubContext())
{
    var authors = context.Authors.ToList();
    foreach (var author in authors)
    {
        Console.WriteLine(author.Name);
    }
}
// Hier is context automatisch gesloten
```

**EF Core werkt via conventies**

* Eigenschappen genaamd Id worden als primaire sleutel beschouwd.
* DbSet-namen worden automatisch als tabelnamen geïnterpreteerd (tenzij aangepast).

**Waarom migrations gebruiken?**

Wanneer je je datamodel verandert (nieuwe properties, klassen, of aanpassingen in DbContext), moet ook de database mee-evolueren. EF Core gebruikt migrations om die wijzigingen bij te houden en toe te passen op de database.

Commando's migration

```
add-migration Initial
```
```
Update-Database
```
```
Script-Migration
```

### Terugdraaien van migration

Stel, je hebt deze migrations:

* 20240601_Initial
* 20240602_AddBooks
* 20240603_AddPrices ← laatst

Stap 1:

```
Update-Database AddBooks
```
Stap 2: verwijder
```
Remove-Migration
```

**Inhoud migration-bestand**

* **Up()** = wat moet er gebeuren
* **Down()** = hoe herstel je dit als je het wil terugdraaien

**Seed data toevoegen (vooraf ingevulde tabellen)**

```
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    var authors = new Author[]
    {
        new Author { Id = 1, FirstName = "Rhoda", LastName = "Lerman" },
        new Author { Id = 2, FirstName = "Jane", LastName = "Doe" }
    };

    modelBuilder.Entity<Author>().HasData(authors);
}
```

**SQL logging**

```options
    .UseSqlServer("connectionstring")
    .LogTo(Debug.WriteLine, new[] { DbLoggerCategory.Database.Command.Name }, LogLevel.Information)
    .EnableSensitiveDataLogging(); // Alleen voor development! toont ook parameterwaarden
```

## Query a database

**Hoe haalt EF Core data op?**
1. LINQ-query uitvoeren:

```
var authors = context.Authors.ToList(); // Triggert de query
```
2. EF Core zet de query om naar SQL.
3. EF opent de databaseverbinding en voert de SQL uit.
4. De resultaten worden omgezet in C# objecten = materialisatie.
5. De `objecten worden getrackt` (EF onthoudt hun oorspronkelijke staat).

**Deferred execution in LINQ**

LINQ-query’s worden pas uitgevoerd als je ze gebruikt, zoals in een foreach.

```
var query = context.Authors.Where(a => a.LastName == "Smith");
// nog geen DB-oproep
foreach (var a in query) { Console.WriteLine(a.FirstName); }
// nu wordt de query uitgevoerd
```

### Tips voor programmeren

**Zoeken op primaire sleutel met .Find()**

```
var author = context.Authors.Find(2); // zoekt op PK
```

**Paging**

```
var page = context.Authors
    .Skip(30) // sla 3 pagina’s van 10 records over
    .Take(10) // haal 10 records op (pagina 4)
    .ToList();
```

**Meerdere records tegelijk toevoegen**

```
var authors = new[]
{
    new Author { FirstName = "Anna", LastName = "Lee" },
    new Author { FirstName = "Mark", LastName = "Stone" },
    new Author { FirstName = "Nina", LastName = "Verde" },
    new Author { FirstName = "Piet", LastName = "Janssens" },
    new Author { FirstName = "Sara", LastName = "De Vries" }
};
context.Authors.AddRange(authors);
context.SaveChanges(); // 1 SQL INSERT voor alle records
```
**Sorteren met OrderBy en ThenBy**

```
var sortedAuthors = context.Authors
    .OrderBy(a => a.LastName)
    .ThenBy(a => a.FirstName)
    .ToList();
```

**FirstOrDefault**

```
var lerman = context.Authors.FirstOrDefault(a => a.LastName == "Lerman");
```
EF vertaalt dit naar: SELECT TOP 1 ... WHERE LastName = 'Lerman'

## Fluent API en Custom Mappings

Met Fluent API kun je custom mappings definiëren in een DbContext. Dit biedt meer controle over hoe klassen worden gemapt naar database-tabellen en kolommen.

**Voorbeelden van custom mappings:**

1. **Primary Key instellen:**
   ```csharp
   modelBuilder.Entity<Author>()
       .HasKey(a => a.Id); // Stelt de primaire sleutel in
   ```

2. **Maximum lengte van een kolom instellen:**
   ```csharp
   modelBuilder.Entity<Author>()
       .Property(a => a.FirstName)
       .HasMaxLength(50); // Maximaal 50 karakters
   ```

3. **Default waarde instellen:**
   ```csharp
   modelBuilder.Entity<Author>()
       .Property(a => a.IsActive)
       .HasDefaultValue(true); // Standaardwaarde is true
   ```

## Snapshots bij Migraties

Een **Snapshot** is een momentopname van het datamodel. EF Core gebruikt snapshots om bij te houden hoe het datamodel eruitzag bij eerdere migraties. Dit helpt om wijzigingen in het model te detecteren en nieuwe migraties te genereren.

**Waarom belangrijk?**
- Zorgt ervoor dat alleen de wijzigingen worden toegepast op de database.
- Helpt bij het terugdraaien van migraties.

## Entity Framework in ASP.NET Core en WPF

1. **ASP.NET Core:**
   - Configureer EF Core in `Program.cs` met dependency injection:
     ```csharp
     services.AddDbContext<PubContext>(options =>
         options.UseSqlServer("connectionstring"));
     ```

2. **WPF:**
   - Configureer EF Core in `App.xaml.cs` of een servicecontainer.
   - Gebruik `DbContext` in ViewModels voor data-interactie.

## Lazy Loading

**Wat is Lazy Loading?**
- Data wordt pas opgehaald wanneer deze daadwerkelijk wordt opgevraagd.

**Waarom vermijden?**
- Kan leiden tot onverwachte extra database-oproepen (N+1-probleem).
- Gebruik in plaats daarvan **Eager Loading** of **Explicit Loading**.

## Explicit Loading

**Wat is Explicit Loading?**
- Handmatig gerelateerde data ophalen voor een entiteit die al in het geheugen is geladen.

**Voorbeeld:**
```csharp
var author = context.Authors.First();
context.Entry(author).Collection(a => a.Books).Load();
```

## Graphs in Entity Framework

Een **Graph** is een verzameling van entiteiten die met elkaar verbonden zijn via relaties. Bij het opslaan van een graph in de database, zorgt EF Core ervoor dat alle gerelateerde entiteiten correct worden verwerkt.

**Voorbeeld:**
- Een `Author` met meerdere `Books` wordt als één graph behandeld.

## Cascading Deletes

**Wat is Cascading Deletes?**
- Wanneer een hoofdentiteit wordt verwijderd, worden de gerelateerde entiteiten automatisch verwijderd.

**Voorbeeld:**
```csharp
modelBuilder.Entity<Author>()
    .HasMany(a => a.Books)
    .WithOne(b => b.Author)
    .OnDelete(DeleteBehavior.Cascade);
```

**Waarom belangrijk?**
- Zorgt ervoor dat de database consistent blijft.
- Vermijdt handmatig verwijderen van gerelateerde data.