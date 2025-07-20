# Test Driven Development (TDD)

## Soorten automatische testen

1. **Unit testen**
   - Testen individuele eenheden van code, zoals methoden of functies.
   - Doel: Verifiëren dat een specifieke eenheid correct werkt.
   - Voordelen: Snel, eenvoudig te schrijven en onafhankelijk van andere delen van de applicatie.

2. **Integratietesten**
   - Testen de interactie tussen verschillende modules of componenten.
   - Doel: Controleren of de modules correct samenwerken.
   - Voorbeeld: Testen of een service correct communiceert met een database.

3. **End-to-end testen**
   - Testen de volledige applicatie van begin tot eind.
   - Doel: Verifiëren dat de applicatie als geheel correct functioneert.
   - Voorbeeld: Een gebruiker logt in, voert een actie uit en controleert het resultaat.

## Voordelen van automatische testen

1. Minder bugs in productie → minder stress, minder nacht- en weekendwerk.
2. Sneller bugs vinden → tijdens ontwikkeling al fouten opsporen.
3. Goedkoper voor het bedrijf → fouten vroeg oplossen = minder tijd en geld kwijt.
4. Meer tijd voor nieuwe features → minder tijd verspillen aan foutopsporing.
5. Betrouwbare resultaten → geen menselijke fouten tijdens testuitvoering.

## Extra voordelen van TDD

1. Je denkt na over wat de code moet doen vóór je begint.
2. Je vermijdt onnodige code (YAGNI: You Ain’t Gonna Need It).
3. Je weet zeker dat alle code die je schrijft ook effectief getest is.

## Toepassing van de red-green-refactor cyclus

1. **Red**: Schrijf een test die faalt omdat de functionaliteit nog niet bestaat.
2. **Green**: Schrijf net genoeg code om de test te laten slagen.
3. **Refactor**: Verbeter de code zonder de functionaliteit te veranderen.

➡️ Herhaal deze cyclus iteratief tijdens het ontwikkelen van een applicatie.

## Ontwikkeling met NUnit en Moq

1. **Desktop applicatie**:
   - Gebruik NUnit voor het schrijven van unit tests.
   - Gebruik Moq om afhankelijkheden te mocken, zoals services of repositories.
   - Voorbeeld: Testen of een knop in de UI een specifieke actie uitvoert.

2. **ASP.NET Core applicatie**:
   - Gebruik NUnit voor het testen van controllers, services en repositories.
   - Gebruik Moq om externe afhankelijkheden te isoleren.
   - Voorbeeld: Testen of een API-endpoint de juiste gegevens retourneert.

# TDD = Ontwikkelmethode waarbij je eerst een test schrijft en pas daarna de code.

Je werkt in 3 stappen:
* **Red**: Schrijf een test → test faalt (nog geen code).
* **Green**: Schrijf net genoeg code om de test te laten slagen.
* **Refactor**: Verbeter je code (zonder dat de test faalt).

➡️ Herhaal steeds opnieuw deze cyclus: Red → Green → Refactor.

Bedacht door Robert C. Martin (Uncle Bob)

Waarom TDD?
* Je denkt na over wat de code moet doen vóór je begint.
* Je vermijdt onnodige code (YAGNI: You Ain’t Gonna Need It).
* Je weet zeker dat alle code die je schrijft ook effectief getest is.
* Je ontwikkelt meer gestructureerd en betrouwbaarder.

De 3 wetten van TDD (Uncle Bob)
* ❌ Geen productcode zonder eerst een faaltest te schrijven.
* 🧪 Schrijf niet meer testcode dan nodig om te laten falen.
* 🛠 Schrijf niet meer productcode dan nodig om te doen slagen.

**Wat is Refactoring?**
Refactoring = je code verbeteren zonder dat het gedrag verandert.
Je maakt de code mooier, duidelijker en gemakkelijker aanpasbaar, zonder dat er iets anders gebeurt voor de gebruiker.

**DRY: Don't Repeat Yourself**

Elk stuk kennis/code hoort maar op één plaats te staan in je systeem.

Waarom?
* Minder fouten.
* Makkelijker aanpassen (je hoeft het maar op 1 plek te wijzigen).
* Minder verwarring.

**SOLID (voor gevorderden – maar goed om te kennen)**

5 principes voor goede, uitbreidbare en onderhoudbare code:

* S – Single Responsibility: Elke klasse heeft maar één taak.
* O – Open/Closed: Je kan iets uitbreiden zonder het aan te passen.
* L – Liskov Substitution: Subklassen moeten dezelfde werking hebben als hun ouders.
* I – Interface Segregation: Gebruik meerdere kleine interfaces i.p.v. één grote.
* D – Dependency Inversion: Werk met abstracties (interfaces), niet met concrete implementaties.

**Wat is een goede unit test?**
* **Test één ding per keer** (één logisch gedrag).
* **Onafhankelijk**: resultaat mag niet afhangen van andere tests.
* **Herhaalbaar**: altijd dezelfde output bij dezelfde input.
* **Duidelijk**: makkelijk leesbaar, zonder ruis.
* **Betrouwbaar**: niet afhankelijk van externe systemen.

**AAA-patroon (Arrange – Act – Assert)**
* **Arrange** → zet alles klaar (mock-objects, testdata).
* **Act** → voer de testactie uit.
* **Assert** → controleer of het resultaat is zoals verwacht


**Wat zijn Test Doubles / Mocks?**

Mocks = nepversies van afhankelijkheden

Je gebruikt ze om:
* Andere systemen te isoleren.
* Geen echte e-mails te sturen of database te gebruiken.
* Verwachte oproepen en resultaten te controleren

**Voorbeeld met Moq:**
```
var mockRepo = new Mock<ICustomerRepository>();
mockRepo.Setup(x => x.Save(It.IsAny<Customer>())).Returns(true);
```
Verifiëren
```
mockRepo.Verify(x => x.Save(It.IsAny<Customer>()), Times.Exactly(1));
```