import { API_KEY } from "./constants";
import { Coordinates } from "./interfaces/coordinates";


interface AutoSuggestOptions extends Microsoft.Maps.IAutosuggestOptions {
    businessSuggestions: boolean;
}

export class MapService {
    static #apiLoaded = false;
    static #apiLoading = false;
    static #autoSuggestLoaded = false;
    #map!: Microsoft.Maps.Map;

    private constructor() {}

    static #loadBingApi(): Promise<void> {
        this.#apiLoading = true;
        const script = document.createElement("script");
        script.src = "https://www.bing.com/api/maps/mapcontrol?callback=showMap";
        script.defer = true;
        document.body.append(script);

        return new Promise<void>((resolve, reject) => {
            (window as unknown as {showMap: () => void}).showMap = (): void => {
                this.#apiLoaded = true;
                resolve();
            };
            script.addEventListener("error", () => reject("Bing API bould not be loaded"));
        });
    }


    static async loadAutoSuggest(): Promise<void> {
        return new Promise<void>((resolve) => {
            Microsoft.Maps.loadModule("Microsoft.Maps.AutoSuggest", () => {
                this.#autoSuggestLoaded = true;
                resolve();
            });
        });
    }

    static get autoSuggestLoaded(): boolean {
        return this.#autoSuggestLoaded;
    }


    static async createMapService(
        coords: Coordinates,
        divMapId: string
    ): Promise<MapService> {
        if(!this.#apiLoaded) await this.#loadBingApi();
        else if(!this.#apiLoading) throw Error("API is already being loaded elsewhere");

        const mapService = new MapService();
        mapService.#map = new Microsoft.Maps.Map("#" + divMapId, {
            credentials: API_KEY,
            center: new Microsoft.Maps.Location(coords.latitude, coords.longitude),
            mapTypeId: Microsoft.Maps.MapTypeId.road,
            zoom: 13
        });
        return mapService;
    }

    createMarker(
        coords: Coordinates,
        color = "red"
    ): Microsoft.Maps.Pushpin {
        const pin = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(coords.latitude, coords.longitude), { color });
        this.map.entities.push(pin);

        return pin;
    }

    async getAutoSuggestManager(): Promise<Microsoft.Maps.AutosuggestManager> {
        if(!MapService.autoSuggestLoaded) await MapService.loadAutoSuggest();
        return new Microsoft.Maps.AutosuggestManager({map: this.#map, placeSuggestions: true, addressSuggestions: true, businessSuggestions: true} as AutoSuggestOptions);
    }

    get map(): Microsoft.Maps.Map {
        return this.#map;
    }
}