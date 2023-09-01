const fireEvent = (node, type, detail, options) => {
    options = options || {};
    detail = detail === null || detail === undefined ? {} : detail;
    const event = new Event(type, {
        bubbles: options.bubbles === undefined ? true : options.bubbles,
        cancelable: Boolean(options.cancelable),
        composed: options.composed === undefined ? true : options.composed,
    });
    event.detail = detail;
    node.dispatchEvent(event);
    return event;
};

if (
    !customElements.get("ha-switch") &&
    customElements.get("paper-toggle-button")
) {
    customElements.define("ha-switch", customElements.get("paper-toggle-button"));
}

if (!customElements.get("ha-entity-picker")) {
    (customElements.get("hui-entities-card")).getConfigElement();
}

const LitElement = customElements.get("hui-masonry-view") ? Object.getPrototypeOf(customElements.get("hui-masonry-view")) : Object.getPrototypeOf(customElements.get("hui-view"));
const html = LitElement.prototype.html;
const css = LitElement.prototype.css;

const HELPERS = window.loadCardHelpers();

export class contentCardLinkyEditor extends LitElement {
    setConfig(config) {
        this._config = {...config};
    }

    static get properties() {
        return {hass: {}, _config: {}};
    }

    get _entity() {
        return this._config.entity || "";
    }

    get _ewEntity() {
        return this._config.ewEntity || "sensor.rte_ecowatt_j0";
    }

    get _ewEntityJ1() {
        return this._config.ewEntityJ1 || "sensor.rte_ecowatt_j1";
    }

    get _ewEntityJ2() {
        return this._config.ewEntityJ2 || "sensor.rte_ecowatt_j2";
    }

    get _tempoEntityInfo() {
        return this._config.tempoEntityInfo || "sensor.edf_tempo_info";
    }

    get _tempoEntityJ0() {
        return this._config.tempoEntityJ0 || "sensor.rte_tempo_today";
    }

    get _tempoEntityJ1() {
        return this._config.tempoEntityJ1 || "sensor.rte_tempo_tomorrow";
    }

    get _name() {
        return this._config.name || "";
    }

    get _showIcon() {
        return this._config.showIcon !== false;
    }

    get _showHeader() {
        return this._config.showHeader !== false;
    }

    get _showHistory() {
        return this._config.showHistory !== false;
    }

    get _showPeakOffPeak() {
        return this._config.showPeakOffPeak !== false;
    }

    get _showInTableUnit() {
        return this._config.showInTableUnit !== false;
    }

    get _showDayPrice() {
        return this._config.showDayPrice !== false;
    }

    get _showDayPriceHCHP() {
        return this._config.showDayPriceHCHP !== false;
    }

    get _showDayMaxPower() {
        return this._config.showDayMaxPower !== false;
    }

    get _showPrice() {
        return this._config.showPrice !== false;
    }

    get _showTitle() {
        return this._config.showTitle !== false;
    }

    get _showDayHCHP() {
        return this._config.showDayHCHP !== false;
    }

    get _showCurrentMonthRatio() {
        return this._config.showCurrentMonthRatio !== false;
    }

    get _showMonthRatio() {
        return this._config.showMonthRatio !== false;
    }

    get _showYearRatio() {
        return this._config.showYearRatio !== false;
    }

    get _showWeekRatio() {
        return this._config.showWeekRatio !== false;
    }

    get _showYesterdayRatio() {
        return this._config.showYesterdayRatio !== false;
    }

    get _showError() {
        return this._config.showError !== false;
    }

    get _showTitreLigne() {
        return this._config.showTitreLigne !== false;
    }

    get _showEcoWatt() {
        return this._config.showEcoWatt !== false;
    }

    get _showEcoWattJ12() {
        return this._config.showEcoWattJ12 !== false;
    }

    get _showTempo() {
        return this._config.showTempo !== false;
    }

    get _title() {
        return this._config.showTitle !== false;
    }

    get _current() {
        return this._config.current !== false;
    }

    get _details() {
        return this._config.details !== false;
    }

    get _nbJoursAffichage() {
        return this._config.nbJoursAffichage || 7;
    }

    get _showDayName() {
        return this._config.showDayName;
    }

    get _titleName() {
        return this._config.titleName || "";
    }

    firstUpdated() {
        HELPERS.then(help => {
            if (help.importMoreInfoControl) {
                help.importMoreInfoControl("fan");
            }
        })
    }

    render() {
        if (!this.hass) {
            return html``;
        }

        return html`
            <div class="card-config">
                <div>
                    <paper-input label="Titre" .value="${this._titleName}" .configValue="${"titleName"}" @value-changed="${this._valueChanged}"></paper-input>
                      ${this.renderSensorPicker("Entity", this._entity, "entity")}
                      ${this.renderSensorPicker("rte_ecowatt_j0", this._ewEntity, "ewEntity")}
                      ${this.renderSensorPicker("rte_ecowatt_j1", this._ewEntityJ1, "ewEntityJ1")}
                      ${this.renderSensorPicker("rte_ecowatt_j2", this._ewEntityJ2, "ewEntityJ2")}
                      ${this.renderSensorPicker("edf_tempo_info", this._tempoEntityInfo, "tempoEntityInfo")}		  
                      ${this.renderSensorPicker("rte_tempo_today", this._tempoEntityJ0, "tempoEntityJ0")}
                      ${this.renderSensorPicker("rte_tempo_tomorrow", this._tempoEntityJ1, "tempoEntityJ1")}
                    <!-- Switches -->
                    <ul class="switches">
                        ${this.renderSwitchOption("Show icon", this._showIcon, "showIcon")}
                        ${this.renderSwitchOption("Show titre", this._showTitle, "showTitle")}
                        ${this.renderSwitchOption("Show history", this._showHistory, "showHistory")}
                        ${this.renderSwitchOption("Show Heures Creuses", this._showPeakOffPeak, "showPeakOffPeak")}
                        ${this.renderSwitchOption("Show unité", this._showInTableUnit, "showInTableUnit")}
                        ${this.renderSwitchOption("Show prix/jour", this._showDayPrice, "showDayPrice")}
                        ${this.renderSwitchOption("Show prix HC/HP", this._showDayPriceHCHP, "showDayPriceHCHP")}
                        ${this.renderSwitchOption("Show prix", this._showPrice, "showPrice")}
                        ${this.renderSwitchOption("Show jours HC/HP", this._showDayHCHP, "showDayHCHP")}
                        ${this.renderSwitchOption("Show jours Max Puissance", this._showDayMaxPower, "showDayMaxPower")}
                        ${this.renderSwitchOption("Show ratio year", this._showYearRatio, "showYearRatio")}
                        ${this.renderSwitchOption("Show ratio mois", this._showCurrentMonthRatio, "showCurrentMonthRatio")}
                        ${this.renderSwitchOption("Show ratio mois precedent", this._showMonthRatio, "showMonthRatio")}
                        ${this.renderSwitchOption("Show ratio semaine", this._showWeekRatio, "showWeekRatio")}
                        ${this.renderSwitchOption("Show ratio hier", this._showYesterdayRatio, "showYesterdayRatio")}
                        ${this.renderSwitchOption("Show titre ligne", this._showTitreLigne, "showTitreLigne")}
                        ${this.renderSwitchOption("Show error", this._showError, "showError")}
                        ${this.renderSwitchOption("Show header", this._showHeader, "showHeader")}
                        ${this.renderSwitchOption("Show EcoWatt J", this._showEcoWatt, "showEcoWatt")}
                        ${this.renderSwitchOption("Show EcoWatt J+1 et J+2", this._showEcoWattJ12, "showEcoWattJ12")}
                        ${this.renderSwitchOption("Show Tempo", this._showTempo, "showTempo")}
                    </ul>
                    <!-- -->
                    <paper-input label="nombre de jours" type="number" min="1" max="12" value=${this._nbJoursAffichage} .configValue="${"nbJoursAffichage"}" @value-changed="${this._valueChanged}"></paper-input>
                    <br>
                    <paper-input label="Nom du jour de la semaine( valeur possible : long, short, narrow )" .value="${this._showDayName}" .configValue="${"showDayName"}" @value-changed="${this._valueChanged}" ></paper-input>
                </div>
            </div>
        `;
    }

    renderSensorPicker(label, entity, configAttr) {
        return this.renderPicker(label, entity, configAttr, "sensor");
    }

    renderPicker(label, entity, configAttr, domain) {
        return html`
            <ha-entity-picker
                    label="${label}"
                    .hass="${this.hass}"
                    .value="${entity}"
                    .configValue="${configAttr}"
                    .includeDomains="${domain}"
                    @change="${this._valueChanged}"
                    allow-custom-entity
            ></ha-entity-picker>
        `
    }

    renderSwitchOption(label, state, configAttr) {
        return html`
            <li class="switch">
                <ha-switch
                        .checked=${state}
                        .configValue="${configAttr}"
                        @change="${this._valueChanged}">
                </ha-switch>
                <span>${label}</span>
                </div>
            </li>
        `
    }

    _valueChanged(ev) {
        if (!this._config || !this.hass) {
            return;
        }
        const target = ev.target;
        if (target.configValue) {
            if (target.value === "") {
                delete this._config[target.configValue];
            } else {
                this._config = {
                    ...this._config,
                    [target.configValue]:
                        target.checked !== undefined ? target.checked : target.value,
                };
            }
        }
        fireEvent(this, "config-changed", {config: this._config});
    }

    static get styles() {
        return css`
      .switches {
        margin: 8px 0;
        display: flex;
        flex-flow: row wrap;
        list-style: none;
        padding: 0;
      }
      .switch {
        display: flex;
        align-items: center;
        width: 50%;
        height: 40px;
      }
      .switches span {
        padding: 0 16px;
      }
    `;
    }
}

customElements.define("content-card-linky-editor", contentCardLinkyEditor);
