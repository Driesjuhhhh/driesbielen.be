# WPF

**Wat is wpf?**

WPF (`Windows Presentation Foundation`) is een .NET-framework om moderne Windows desktop-apps te bouwen met rijke UI, en is sinds 2006 beschikbaar als open source.

**Wat is XAML?**

XAML is een XML-gebaseerde taal waarmee je de UI van een WPF-app ontwerpt, terwijl de achterliggende logica in C# staat.

**WPF Projectstructuur**
* MainWindow.xaml → definieert de UI met XAML
* MainWindow.xaml.cs → bevat de logica in C# (zoals knop-acties)

`Partial classes` maken het mogelijk om één klasse over meerdere bestanden te verdelen.

*Voorbeeld*

```
<!-- MainWindow.xaml -->
<Window x:Class="MyApp.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        Title="Welkom" Height="200" Width="300">
    <Grid>
        <Button Content="Klik mij" Click="Button_Click"/>
    </Grid>
</Window>
```

```
// MainWindow.xaml.cs (code-behind)
private void Button_Click(object sender, RoutedEventArgs e)
{
    MessageBox.Show("Je klikte op de knop!");
}
```

Bij het opstarten van een WPF-app wordt een Application-object aangemaakt, gedefinieerd in `App.xaml en App.xaml.cs`, dat de hele applicatie vertegenwoordigt met opstartlogica en gedeelde resources.
Standaard opent het de MainWindow, zoals opgegeven via het `StartupUri-attribuut` in App.xaml.

![alt text](images/image.png)

## Instantiating objects in XAML

In XAML gebruik je elementen om objecten aan te maken via hun parameterloze constructor en attributen om eigenschappen in te stellen of event handlers te koppelen.

![alt text](images/image-5.png)

* Attribute syntax – eenvoudig via attributen:

```
<Button Content="Klik" Width="100" />
```
* Property element syntax – voor complexere waardes:

```
<Button>
  <Button.Content>
    <StackPanel>
      <TextBlock Text="Hallo"/>
    </StackPanel>
  </Button.Content>
</Button>
```

* Content syntax – directe inhoud zonder aparte eigenschap:

```
<TextBlock>Hallo</TextBlock>
```

* Collection syntax – meerdere elementen in één eigenschap (zoals in een lijst of layoutcontainer)

```
<StackPanel>
  <Button Content="OK"/>
  <Button Content="Annuleren"/>
</StackPanel>
```

In `XAML stel je een eigenschap in via een attribuut met een stringwaarde`, behalve bij `x:-prefixen` zoals x:Name, die geen eigenschap instellen maar `een objectnaam voor gebruik in code-behind aangeven.`

**Content syntax in XAML**

In XAML kent de parser directe inhoud zoals "`Add customer`" toe aan een eigenschap van het element (zoals `Content` bij een Button) door te kijken naar het `ContentPropertyAttribute` op de klasse of een van zijn basisklassen.

**Voorbeeld**

```
<Button>Add customer</Button>
```

De XAML-parser:

1. Ziet dat "Add customer" directe inhoud is.
2. Zoekt naar het [`ContentProperty`]-attribuut op de Button-klasse.
3. Vindt dat Button (via ContentControl) een ContentProperty heeft met naam Content.
```
[ContentProperty("Content")]
public class ContentControl : Control
{
    public object Content { get; set; }
    // Andere eigenschappen en methodes...
}
```

4. Wijs "Add customer" toe aan de Content-eigenschap van de knop.

Dit is dus **gelijk** aan:
```
<Button>
  <Button.Content>Add customer</Button.Content>
</Button>
```

XAML gebruikt het [`ContentProperty`]-attribuut om te bepalen welke eigenschap de "`directe inhoud`" van een element krijgt. **Daardoor hoef je sommige eigenschappen niet expliciet te vermelden.**

Eerste manier

```
<Window.Content>
  <Grid.Children>
    <Button>
      <Button.Content>
        <StackPanel>
          <StackPanel.Children>
            <Image />
          </StackPanel.Children>
```
maar kan ook eenvoudiger

```
<Window>
  <Grid>
    <Button>
      <StackPanel>
        <Image />
      </StackPanel>
```

## Layout

**Veelgebruikte layout-eigenschappen:**

* **Margin**: ruimte rondom een element (bijv. Margin="20" = 20 pixels aan alle zijden)
* **Padding:** ruimte binnen de rand van een element, tussen rand en inhoud
* **Alignment**: bepaalt hoe een element wordt uitgelijnd als er extra ruimte is (bv. HorizontalAlignment, VerticalAlignment)
* **Width & Height:** breedte en hoogte kunnen vast of begrensd ingesteld worden met MinWidth, MaxHeight, ...

**Belangrijkste layoutpanelen:**

* **StackPanel**: plaatst elementen onder elkaar of naast elkaar
    * Orientation
        * Vertical (Default)
        * Horizontal
* **Grid:** verdeelt ruimte in rijen en kolommen (flexibel)
* **Canvas**: absolute positie met Canvas.Left en Canvas.Top

* **DockPanel:** elementen "vastmaken" aan een kant (links, rechts, boven...)
* **WrapPanel:** elementen automatisch laten terugspringen naar een nieuwe regel als er geen ruimte meer is

### Voor meer info zie pdf

## Controls

**Wat is een control?**

Een control in WPF is een klasse met een `gebruikersinterface` en `bijhorend gedrag`, die kan worden `getoond in een venster`.
Ze zijn onderdeel van het .NET-framework en zitten meestal in de namespace System.Windows.Controls.

**Verschil tussen Built-in Controls en User Controls:**

| Soort                | Beschrijving                                                                                              |
| -------------------- | --------------------------------------------------------------------------------------------------------- |
| **Built-in control** | Standaard WPF-besturingselementen die je direct kunt gebruiken, zoals `Button`, `TextBox`, `Grid`, enz.   |
| **User control**     | **Zelfgemaakte herbruikbare component** opgebouwd uit bestaande XAML + logica, afgeleid van `UserControl` |


**Voorbeelden van built-in controls**

* Knoppen: Button, RepeatButton
* Input: TextBox, PasswordBox
* Weergave: Label, TextBlock, Image, ProgressBar
* Lijsten: ListBox, ComboBox, CheckBox, RadioButton
* Layout: StackPanel, Grid, Canvas, DockPanel, WrapPanel
* Navigatie: TabControl, Frame
* Data: DataGrid, ListView, TreeView

**Voorbeeld UserControl gebruiken in XAML:**

1. Maak een UserControl (bijv. CustomerView.xaml)
2. Voeg namespace toe in MainWindow.xaml:

```
xmlns:controls="clr-namespace:MyApp.Views"
```

3. Gebruik hem als tag:

```
<controls:CustomerView />
```