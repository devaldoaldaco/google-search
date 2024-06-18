import { LitElement, html } from "lit";

export default class ModalComponent extends LitElement {
    constructor() {
        super();
        this.datos = '';
        this.open = false;
    }

    static properties = {
        datos: {
            type: String,
        },
        open: {
            type: Boolean
        }
    }

    render() {
        return html`
            <style>
                :host {
                    display: none;
                    height: 100vh;
                    width: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                }
                section {
                    background-color: rgba(8,73,214, 0.6);
                    height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center; 
                }
                article {
                    width: 60%;
                    height: 20rem;
                    background-color: white;
                    margin: 0 auto;
                    vertical-align: middle;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 2rem;
                    font-weight: bold;
                    font-family: sans-serif;
                    position: relative;
                    button {
                        width: 50px;
                        height: 50px;
                        background-color: black;
                        color: white;
                        font-size: 1.5rem;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        border-radius: 50%;
                        position: absolute;
                        top: 0.5rem;
                        right: 0.5rem;
                        font-weight: inherit;
                        border: none;
                    }
                }
            </style>
            <section>
                <article>
                    <p>${this.datos}</p>
                    <button id="closeButton">X</button>
                </article>
            </section>
        `;
    }

    updated(changedProperties) {
        changedProperties.forEach((oldValue, name) => {
            
            if(name === 'datos') {
                console.log('la propiedad datos cambio');
                console.log(oldValue);
                console.log(this.datos);
            }

            if(name === 'open') {
                console.log('la propiedad open cambio');
                console.log(oldValue);
                console.log(this.open);
            }
            
        });
    }

    firstUpdated() {
        this.shadowRoot.getElementById('closeButton').addEventListener('click', (ev) => {
            console.log(ev);
            this.dispatchEvent(new CustomEvent('close-modal', {bubbles: true, composed: true, detail: false}));
        });
    }

}