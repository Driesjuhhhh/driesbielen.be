![alt text](/images/image-11.png)

Uitleg van het diagram
* MainWindow: toont een gebruikersinterface (bijv. via ContentControl).
* MainViewModel: is de DataContext van het MainWindow en bevat een eigenschap SelectedViewModel.
* SelectedViewModel: wijst naar een specifieke viewmodel, zoals CustomersViewModel.
* CustomersView: is een gebruikersinterface (XAML-bestand) die als DataContext gebruikt maakt van SelectedViewModel.

Binding zorgt ervoor dat de juiste ViewModel aan de juiste View wordt gekoppeld.

## Codevoorbeeld aan de hand van een afbeelding

**MainViewModel**

```
public class MainViewModel
{
    public object SelectedViewModel { get; set; }

    public MainViewModel()
    {
        SelectedViewModel = new CustomersViewModel(); // je kunt dit ook later wijzigen
    }
}
```

**CustomerViewModel**

```
public class CustomersViewModel
{
    public string Title => "Customer Overview";
}
```
**MainWindow.xaml**
```
<Window x:Class="MyApp.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:views="clr-namespace:MyApp.Views"
        xmlns:local="clr-namespace:MyApp"
        Title="MainWindow" Height="350" Width="525">
    <Window.DataContext>
        <local:MainViewModel />
    </Window.DataContext>

    <Grid>
        <!-- Dynamisch tonen van de juiste View op basis van het type ViewModel -->
        <ContentControl Content="{Binding SelectedViewModel}" />
    </Grid>
</Window>
```

**CustomersView.xaml**

```
<UserControl x:Class="MyApp.Views.CustomersView"
             xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:local="clr-namespace:MyApp.Views">
    <Grid>
        <TextBlock Text="{Binding Title}" FontSize="24" />
    </Grid>
</UserControl>
```

**App.xaml**

```
<Application.Resources>
    <DataTemplate DataType="{x:Type local:CustomersViewModel}">
        <views:CustomersView />
    </DataTemplate>
</Application.Resources>
```

## Extra voorbeeld met meerdere schermen

**Voorbeeld van meerdere schermen**

Structuuroverzicht:

```
MainWindow.xaml (met ContentControl + knoppen)
└── MainViewModel.cs
    ├── SelectedViewModel
    ├── ShowCustomersCommand
    ├── ShowOrdersCommand
    └── ShowProductsCommand

Views/
├── CustomersView.xaml
├── OrdersView.xaml
└── ProductsView.xaml

ViewModels/
├── CustomersViewModel.cs
├── OrdersViewModel.cs
└── ProductsViewModel.cs
```

ViewModels

```
public class CustomersViewModel { public string Title => "Customers"; }
public class OrdersViewModel { public string Title => "Orders"; }
public class ProductsViewModel { public string Title => "Products"; }
```
MainViewModel.cs
```
using System.Windows.Input;

public class MainViewModel
{
    public object SelectedViewModel { get; set; }

    public ICommand ShowCustomersCommand { get; }
    public ICommand ShowOrdersCommand { get; }
    public ICommand ShowProductsCommand { get; }

    public MainViewModel()
    {
        ShowCustomersCommand = new DelegateCommand(() => SelectedViewModel = new CustomersViewModel());
        ShowOrdersCommand = new DelegateCommand(() => SelectedViewModel = new OrdersViewModel());
        ShowProductsCommand = new DelegateCommand(() => SelectedViewModel = new ProductsViewModel());

        // Startscherm
        SelectedViewModel = new CustomersViewModel();
    }
}
```

MainWindow.xaml
```
<Window x:Class="MyApp.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:local="clr-namespace:MyApp"
        Title="MVVM Navigation" Height="400" Width="600">
    
    <Window.DataContext>
        <local:MainViewModel />
    </Window.DataContext>

    <DockPanel>
        <StackPanel Orientation="Horizontal" DockPanel.Dock="Top" Background="LightGray">
            <Button Content="Customers" Command="{Binding ShowCustomersCommand}" Margin="5"/>
            <Button Content="Orders" Command="{Binding ShowOrdersCommand}" Margin="5"/>
            <Button Content="Products" Command="{Binding ShowProductsCommand}" Margin="5"/>
        </StackPanel>

        <ContentControl Content="{Binding SelectedViewModel}" />
    </DockPanel>
</Window>
```

CustomersView.xaml (zelfde voor OrdersView en ProductsView)

```
<UserControl x:Class="MyApp.Views.CustomersView"
             xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
    <Grid>
        <TextBlock Text="{Binding Title}" FontSize="28" HorizontalAlignment="Center" VerticalAlignment="Center"/>
    </Grid>
</UserControl>
```

App.xaml (DataTemplates voor automatische view-switch)

```
<Application x:Class="MyApp.App"
             xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
             xmlns:views="clr-namespace:MyApp.Views"
             xmlns:viewModels="clr-namespace:MyApp.ViewModels">
    <Application.Resources>
        <DataTemplate DataType="{x:Type viewModels:CustomersViewModel}">
            <views:CustomersView />
        </DataTemplate>
        <DataTemplate DataType="{x:Type viewModels:OrdersViewModel}">
            <views:OrdersView />
        </DataTemplate>
        <DataTemplate DataType="{x:Type viewModels:ProductsViewModel}">
            <views:ProductsView />
        </DataTemplate>
    </Application.Resources>
</Application>
```
