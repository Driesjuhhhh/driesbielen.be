# Onion architecture

## LAYERS

**Waarom nood aan layers?**

* Om de complexiteit van applicaties te beheersen
* Om de code beter te organiseren en onderhoudbaar te maken

**Wat zijn lagen (layers)?**
* Groeperen van klassen op hoog niveau

Elke laag bevat klassen die gespecialiseerd zijn in één aspect van de applicatie
* Presentation layer → UI-componenten
* Infrastructure layer → database, API, bestanden
* Core layer → domeinlogica en applicatieregels

`Elke laag heeft een publieke interface`
* Andere lagen gebruiken deze interface zonder de interne details te kennen

**Separation of Concerns (SoC)**
* `Verdeel code in logisch gescheiden klassen/lagen`
* Elke klasse of laag heeft één duidelijke verantwoordelijkheid

Voordelen:

* Beter leesbaar
* Makkelijker uit te breiden
* Eenvoudiger te onderhouden

Vermijdt overlappingen (losse koppeling = "`loose coupling`")

**Laagstructuur rond domein**

```
[ UI / Presentation ]
       ↓
[ Application Logic ]
       ↓
[ Domain (Core business) ]
       ↑
[ Infrastructure (DB, APIs, IO...) ]
```

##  LAYERS IN .NET

Elke laag in een apart project binnen dezelfde solution

* 📦 MyApp.Core
* 📦 MyApp.Application
* 📦 MyApp.Infrastructure
* 📦 MyApp.UI

➕ Voordelen:
* Fysieke scheiding van lagen
* Duidelijke afhankelijkheden
* Betere encapsulation (afschermen van implementatiedetails)
* Moeilijker om per ongeluk klassen uit de verkeerde laag te gebruiken

🔐 `Gebruik van internal
internal = toegang alleen binnen hetzelfde project`

Alternatief voor public, maar beveiligt de laaggrenzen

➕ Voordelen:

* Houdt je publieke interface klein en overzichtelijk
* Andere projecten zien enkel wat ze moeten zien
* Versterkt Separation of Concerns

## CLASSIC 3-TIER ARCHITECTURE

3-Tier Architecture

Lagen:

User Interface (UI) Layer
* Bevat code voor interactie met de gebruiker (bv. WPF-pagina’s)
* Spreekt alleen met de Business Logic-laag

Business Logic Layer
* Bevat domeinlogica, validaties, regels
* Spreekt alleen met de Data-laag
* Weet niets van UI

Data Layer
* Toegang tot database (bv. via repositories of Entity Framework)
* Kent enkel zichzelf – weet niets van andere lagen

### Voordelen en nadelen van 3-Tier Architectuur

**Voordelen:**

1. **Duidelijke scheiding van verantwoordelijkheden:**
   - Elke laag heeft een specifieke taak, wat de code overzichtelijker en onderhoudbaar maakt.

2. **Herbruikbaarheid:**
   - Lagen zoals de Business Logic en Data Layer kunnen worden hergebruikt in andere applicaties.

3. **Schaalbaarheid:**
   - Elke laag kan onafhankelijk worden geschaald, bijvoorbeeld door een aparte server voor de Data Layer te gebruiken.

4. **Testbaarheid:**
   - Door de scheiding van lagen is het eenvoudiger om unit tests te schrijven voor individuele lagen.

**Nadelen:**

1. **Complexiteit:**
   - Het toevoegen van meerdere lagen kan de architectuur complexer maken, vooral voor kleine projecten.

2. **Prestatie-overhead:**
   - Communicatie tussen lagen kan leiden tot extra overhead, wat de prestaties kan beïnvloeden.

3. **Afhankelijkheden:**
   - Als de lagen niet goed worden ontworpen, kunnen er ongewenste afhankelijkheden ontstaan, wat de voordelen van de scheiding tenietdoet.

4. **Moeilijker te debuggen:**
   - Problemen kunnen moeilijker te traceren zijn omdat ze door meerdere lagen heen kunnen gaan.

## ONION ARCHITECTURE

![alt text](images/image-12.png)

**Wat is Onion Architecture?**

Een gelaagd architecturaal patroon waarbij de kern (Core) van de applicatie onafhankelijk blijft van de presentatie- en infrastructuur-laag.

Lagen van de Onion Architecture

1. **Core – Domain Layer**

    * Doel: Beschrijft de businessregels en entiteiten.
    * Geen afhankelijkheden naar buiten toe.

2. **Core – Application Logic Layer**
    * Doel: Implementeert use cases (vb. “genereer pair-programming team”).
    * Bevat services en repository interfaces

3.  **Infrastructure Layer**
    * Doel: Implementeert de repository interfaces, verzorgt database- en infrastructuurcommunicatie.
    * `Belangrijk`: De Infrastructure-laag verwijst alleen naar de Core-lagen (Logic + Domain), niet naar Presentation.
4. **Presentation Layer (bv. WPF UI)**
    * Doel: Gebruikersinterface
    * Bindt aan ViewModels uit de Application Logic Layer
    * Weet niets van de infrastructuur
    * Voorbeeld: gebruik IPairProgrammingService in een ViewModel


**Wiring – Alles aan elkaar koppelen via Dependency Injection**

Waarom wiring nodig is
* De presentation layer is het opstartpunt van de applicatie (de Main()).
* Daarom moet deze laag alle services en repositories samenstellen.

Om toegang te krijgen tot internal klassen van andere lagen:

```
// In logic/infrastructure project: Properties/AssemblyInfo.cs
[assembly: InternalsVisibleTo("PresentationProjectName")]
```

## Access Modifiers

Access modifiers bepalen de toegankelijkheid van klassen, methoden en andere leden in C#. Hier zijn de belangrijkste modifiers:

1. **public**
   - Toegang: Overal toegankelijk, zowel binnen als buiten de assembly.
   - Gebruik: Voor leden die beschikbaar moeten zijn voor alle andere klassen.

2. **private**
   - Toegang: Alleen toegankelijk binnen de klasse waarin het is gedefinieerd.
   - Gebruik: Voor implementatiedetails die verborgen moeten blijven voor andere klassen.

3. **protected**
   - Toegang: Toegankelijk binnen de klasse waarin het is gedefinieerd en in afgeleide klassen.
   - Gebruik: Voor leden die beschikbaar moeten zijn voor subklassen, maar niet voor andere klassen.

4. **internal**
   - Toegang: Alleen toegankelijk binnen dezelfde assembly.
   - Gebruik: Voor leden die niet buiten de assembly beschikbaar hoeven te zijn.


