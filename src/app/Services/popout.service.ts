import { ComponentPortal, DomPortalOutlet, PortalInjector } from '@angular/cdk/portal';
import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Injectable, Injector } from '@angular/core';
import { InjectionToken } from '@angular/core';
import { GuideBook } from '../Objects/packs';
import { GuideBookComponent } from '../Pages/pack-content-page/guide-book/guide-book.component';
//chrome-extension://klbibkeccnjlkjkiokjodocebajanakg/suspended.html#ttl=Open%20Angular%20components%20dynamically%20in%20new%20browser%20tab%20without%20bootstrapping%20the%20whole%20app%20again%20%7C%20by%20Saranya%20Thangaraj%20%7C%20Medium&pos=8699.0908203125&uri=https://medium.com/@saranya.thangaraj/open-angular-component-in-a-new-tab-without-bootstrapping-the-whole-app-again-e329af460e92
@Injectable({
  providedIn: 'root'
})
export class PopoutService {

  styleSheetElement;
  data;
  modalName: string;

  constructor(
    private injector: Injector,
    private componentFactoryResolver: ComponentFactoryResolver,
    private applicationRef: ApplicationRef
  ) { }

  openPopoutModal(data) {
    this.modalName = data.modalName;
    if (this.isPopoutWindowOpen())
      this.focusPopoutWindow();
    else {
      const windowInstance = this.openOnce(
        this.modalName,
        `${this.modalName}`
      );

      // Wait for window instance to be created
      setTimeout(() => {
        this.createCDKPortal(data, windowInstance);
      }, 200);
    }
  }

  closePopoutModal() {
    POPOUT_MODALS[this.modalName] ? POPOUT_MODALS[this.modalName]['windowInstance'].close() : null;
  }

  openOnce(url, target) {
    // open a blank "target" window
    // or get the reference to the existing "target" window
    const winRef = window.open('', target, "height=700,width=1000", false);
    return winRef;
  }

  createCDKPortal(data, windowInstance) {
    this.data = data;
    if (windowInstance) {
      // debugger
      // Create a PortalOutlet with the body of the new window document
      const outlet = new DomPortalOutlet(windowInstance.document.body, this.componentFactoryResolver, this.applicationRef, this.injector);
      const injector = this.createInjector(data);

      // Attach the portal
      let componentInstance;
      windowInstance.document.title = 'ספר הדרכה';
      componentInstance = this.attachGuidebookContainer(outlet, injector);

      POPOUT_MODALS[this.modalName] = { windowInstance, outlet, componentInstance };
    }
  }

  isPopoutWindowOpen() {
    return POPOUT_MODALS && POPOUT_MODALS[this.modalName] && POPOUT_MODALS[this.modalName]['windowInstance'] && !POPOUT_MODALS[this.modalName]['windowInstance'].closed
  }

  focusPopoutWindow() {
    POPOUT_MODALS[this.modalName] ? POPOUT_MODALS[this.modalName]['windowInstance'].focus() : null;
  }

  //Create data for GuideBook page
  createInjector(data): PortalInjector {
    const injectionTokens = new WeakMap();
    injectionTokens.set(POPOUT_MODAL_DATA, data);
    return new PortalInjector(this.injector, injectionTokens);
  }

  attachGuidebookContainer(outlet, injector) {
    const containerPortal = new ComponentPortal(GuideBookComponent, null, injector);
    const containerRef: ComponentRef<GuideBookComponent> = outlet.attach(containerPortal);
    return containerRef.instance;
  }
}

export interface PopoutData {
  modalName: string;
  guideBook: GuideBook;
  packName: string;
  packDesc: string;
}

export const POPOUT_MODAL_DATA = new InjectionToken<PopoutData>('POPOUT_MODAL_DATA');

export let POPOUT_MODALS = {
};
