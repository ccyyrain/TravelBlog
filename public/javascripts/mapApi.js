var map, places, infoWindow;
var markers = [];
var autocomplete;
var countryRestrict = {
    'country': 'us'
};

function initMap() {
    // map = new google.maps.Map(document.getElementById('map'), {
    //     zoom: countries['us'].zoom,
    //     center: countries['us'].center,
    //     mapTypeControl: false,
    //     panControl: false,
    //     zoomControl: false,
    //     streetViewControl: false
    // });
    // infoWindow = new google.maps.InfoWindow({
    //     content: document.getElementById('info-content')
    // });
    // Create the autocomplete object and associate it with the UI input control.
    // Restrict the search to the default country, and to place type "cities".
    autocomplete_region = new google.maps.places.Autocomplete(
        (
            document.getElementById('reviewCountry')), {
            types: ['(regions)'],
            // componentRestrictions: countryRestrict
        });
    autocomplete_region_update = new google.maps.places.Autocomplete(
        (
            document.getElementById('u_reviewCountry')), {
            types: ['(regions)'],
            // componentRestrictions: countryRestrict
        });
    autocomplete_region_search = new google.maps.places.Autocomplete(
        (
            document.getElementById('s_reviewCountry')), {
            types: ['(regions)'],
            // componentRestrictions: countryRestrict
        });
    autocomplete_city_update = new google.maps.places.Autocomplete(
        (
            document.getElementById('u_reviewCity')), {
            types: ['(cities)'],
            // componentRestrictions: countryRestrict
        });
    autocomplete_city_search = new google.maps.places.Autocomplete(
        (
            document.getElementById('s_reviewCity')), {
            types: ['(cities)'],
            // componentRestrictions: countryRestrict
        });
    autocomplete_city = new google.maps.places.Autocomplete(
        (
            document.getElementById('reviewCity')), {
            types: ['(cities)'],
            // componentRestrictions: countryRestrict
        });
    // places = new google.maps.places.PlacesService(map);

    // autocomplete.addListener('place_changed', onPlaceChanged);

    // Add a DOM event listener to react when the user selects a country.
    // document.getElementById('country').addEventListener(
    //     'change', setAutocompleteCountry);
}
