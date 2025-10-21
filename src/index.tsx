import React from 'react';
import ReactDOM from 'react-dom';
import TicketingWidget from './TicketingWidget';


class happeoCustomReactWidget extends HTMLElement {
  connectedCallback() {
    const uniqueId = this.getAttribute('uniqueId') || '';
    const mode = this.getAttribute('mode') || '';

    ReactDOM.render(<TicketingWidget mode={mode} id={uniqueId}></TicketingWidget>, this);
  }

  disconnectedCallback() {
    ReactDOM.unmountComponentAtNode(this);
  }
}

// const slug = process.env.SLUG || 'ticketing-sysytem-xd0uqzxikeqy25kin6ac';
const slug = 'ticketing-sysytem-xd0uqzxikeqy25kin6ac';

window.customElements.get(slug) ||
  window.customElements.define(slug, happeoCustomReactWidget);
