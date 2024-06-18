import {LitElement, html} from 'lit';
import {ifDefined} from 'lit/directives/if-defined.js';

import ModalComponent from '../modal-component/modal-component.js';
customElements.define('modal-component', ModalComponent);

export default class GoogleSearch extends LitElement {
    constructor() {
        super();
        this._listToSearch = ['aldo', 'edgar', 'gloria', 'marco'];
        this.text = 'Google';
        this.stringToSearch = '';
        this.shouldOpenModal = false;
    }

    static properties = { // LIT ELEMENT 3
        _listToSearch: { // listtosearch
            type: Array, // obligatorio
            attribute: 'list-to-search', // opcional
        },
        text: { // text
            type: String
        },
        stringToSearch: {
            type: String
        },
        shouldOpenModal: {
            type: Boolean
        }
    };

    updated(changedProperties) {
        console.log(changedProperties);
        changedProperties.forEach((oldValue, propName) => {
            console.log(`${propName} changed. oldValue: ${oldValue}`);
        });
    }

    async someoneIsWriting() {
        await this.updateComplete;
        this.input = this.shadowRoot.getElementById('searchInput');
        this.input.addEventListener('input', ({data}) => {
            this.stringToSearch += data;
        }); // imperativa
    }

    isTheStringInArray() {
        const validation = this._listToSearch.includes(this.stringToSearch);
        if(validation) {
            this.dispatchEvent(new CustomEvent('open-modal', {composed: true, bubbles: true, detail: this.stringToSearch}));
        }
    }

    firstUpdated() {
        this.someoneIsWriting();
        this.shadowRoot.getElementById('searchButton').addEventListener('click', () => {
            this.shouldOpenModal = true;
            this.dataForModal = this.stringToSearch;
        });
    }

    closeModal(ev) {
        this.shouldOpenModal = ev.detail; // false
        this.cleanData();
    }

    cleanData() {
        this.stringToSearch = '';
        this.dataForModal = '';
        this.input.value  = '';
    }

    render() {
        return html`
            <style>
                * {
                    margin: 0;
                    padding: 0;
                }
                :host {
                    display: block;
                    height: 100vh;
                    background-color: #3C3C3C;
                    position: relative;
                    top: 0;
                    left: 0;
                }
                h1 {
                    color: white;
                }
                header {
                    text-align: right;
                }
                main {
                    text-align: center;
                    h1 {
                        font-size: 5rem;
                        font-weight: 700;
                        text-align: center;
                    }

                    #search {
                        border: 1px solid grey;
                        border-radius: 2.5rem;
                        width: 70%;
                        background-color: white;
                        margin: 2rem auto 0;
                        display: flex;
                        align-items: center;
                        justify-content: space-around;
                        padding: 0.5rem;
                    }

                    .button {
                        height: 44px;
                        border: none;
                        background-color: transparent;
                        border-top-left-radius: 1.5rem;
                        border-bottom-left-radius: 1.5rem;
                        margin: 0;
                        padding: 0;
                        img {
                            height: 44px;
                        }
                    }

                    input {
                        font-size: 1.5rem;
                        height: 44px;
                        width: 70%;
                        border-radius: 2rem;
                        margin: 1 auto;
                        padding: 0.3rem 0;
                        border: none;
                        outline: none;
                    }

                    .box {
                        height: 7rem;
                        width: 7rem;
                        background-color: transparent;
                        border: none;
                        box-shadow: none;
                        img {
                            height: 2.5rem;
                            width: 2.5rem;
                        }
                        span {
                            display: block;
                        }
                    }
                }

                #buttons {
                    width: 60%;
                    margin: 0 auto;
                    display: grid;
                    grid-template-columns: repeat(5, 1fr);
                }

                modal-component[open] {
                    display: block;
                }
            </style>
            <header>
                <a href="gmail.com">Gmail</a>
                <a href="google.drive.com/images">Images</a>
                <button>matraz</button>
                <button>puntos</button>
                <button>foto</button>
            </header>
            <main>
                <h1>${this.text}</h1>
                <div id="search">
                    <button class="button" id="searchButton">
                        <img src="../../assets/icon-search.svg"/>
                    </button>
                    <input id="searchInput" placeholder="Search google or type a URL" type="text"/>
                    <button class="button">
                        <img src="../../assets/icon-microphone.svg"/>
                    </button>
                    <button class="button">
                        <img src="../../assets/icon-camera.svg"/>
                    </button>
                </div>
            </main>
            <modal-component @close-modal="${this.closeModal}" datos="${ifDefined(this.dataForModal)}" ?open="${this.shouldOpenModal}"></modal-component>
        `;
    }
}

/*
NOTA:
    Lit element asigna un nombre de atributo a cada propiedad del componente web, por defecto 
    Lit pone el nombre del atributo usando el nombre de la propiedad y convirtiendolo a lowercase(minusculas) 
*/

/*
4 apis estandares que usamos para construir un componente web
1.- HTML Template
2.- Shadow DOM PALOMITA
3.- Custom Elements PALOMITA 
4.- EcmaScript modules PALOMITA 
*/

/*
CICLO DE VIDA DE UN WEB COMPONENT(SIN LIT ELEMENT)
1.- constructor
2.- connectedCallback
3.- disconnectedCallback
4.- attributeChangedCallback
*/

/*
CICLO DE VIDA DE UN WEB COMPONENT(CON LIT ELEMENT)
1.- constructor
2.- connectedCallback
3.- disconnectedCallback
4.- attributeChangedCallback
======================== DIFERENCIA
5.- someProperty.hasChanged
6.- requestUpdate
7.- performUpdate
8.- shouldUpdate
9.- update
10.- render
11.- firstUpdated
12.- updated
*/

/* API PUBLICA DEL COMPONENTE */
/* POO => PROGRAMACION ORIENTADA A OBJETOS
    ENCAPSULAMIENTO 
    ASOCIASION 
    HERENCIA
    POLIMORFISMO
    ABSTRACCION
    ISNTANCIA
*/

/* DATA BINDING */