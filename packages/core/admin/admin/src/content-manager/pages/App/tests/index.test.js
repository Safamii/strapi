/* eslint-disable no-irregular-whitespace */
import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { act, render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { lightTheme, darkTheme } from '@strapi/design-system';
import Theme from '../../../../components/Theme';
import ThemeToggleProvider from '../../../../components/ThemeToggleProvider';
import { App as ContentManagerApp } from '..';
import cmReducers from '../../../../reducers';
import useContentManagerInitData from '../useContentManagerInitData';

jest.mock('../useContentManagerInitData', () =>
  jest.fn(() => {
    return {};
  })
);

jest.mock('../../NoContentType', () => () => {
  return <div>NoContentType</div>;
});

jest.mock('@strapi/helper-plugin', () => ({
  ...jest.requireActual('@strapi/helper-plugin'),
  useGuidedTour: jest.fn(() => ({
    startSection: jest.fn(),
  })),
}));

describe('Content manager | App | main', () => {
  beforeEach(() => {
    jest.resetModules(); // Most important - it clears the cache
  });

  it('should not crash', () => {
    const contentManagerState = {
      collectionTypeLinks: [
        {
          uid: 'category',
          title: 'Categories',
          name: 'category',
          to: '/content-manager/collectionType/category',
          kind: 'collectionType',
          isDisplayed: true,
          permissions: [
            {
              action: 'plugin::content-manager.explorer.read',
              subject: 'category',
            },
          ],
        },
      ],
      singleTypeLinks: [
        {
          uid: 'homepage',
          title: 'Home page',
          name: 'homepage',
          to: '/homepage',
          kind: 'singleType',
          isDisplayed: true,
          permissions: [
            {
              action: 'plugin::content-manager.explorer.read',
              subject: 'homepage',
            },
          ],
        },
      ],
      models: [
        {
          kind: 'collectionType',
          uid: 'category',
          isDisplayed: true,
          info: { label: 'Categories', name: 'category' },
        },
        {
          kind: 'singleType',
          isDisplayed: true,
          uid: 'homepage',
          info: { label: 'Home page', name: 'homepage' },
        },
      ],
      components: [],
      status: 'resolved',
    };
    useContentManagerInitData.mockImplementation(() => contentManagerState);
    const rootReducer = combineReducers(cmReducers);
    const store = createStore(rootReducer, { 'content-manager_app': contentManagerState });
    const history = createMemoryHistory();
    act(() => history.push('/content-manager'));

    const { container } = render(
      <IntlProvider messages={{}} defaultLocale="en" locale="en">
        <ThemeToggleProvider themes={{ light: lightTheme, dark: darkTheme }}>
          <Theme>
            <DndProvider backend={HTML5Backend}>
              <Provider store={store}>
                <Router history={history}>
                  <ContentManagerApp />
                </Router>
              </Provider>
            </DndProvider>
          </Theme>
        </ThemeToggleProvider>
      </IntlProvider>
    );

    expect(screen.getByText('Home page')).toBeVisible();
    expect(screen.getByText('Categories')).toBeVisible();
    expect(history.location.pathname).toEqual('/content-manager/collectionType/category');
    expect(container.firstChild).toMatchInlineSnapshot(`
      .c37 {
        border: 0;
        -webkit-clip: rect(0 0 0 0);
        clip: rect(0 0 0 0);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        width: 1px;
      }

      .c33 {
        padding-bottom: 56px;
      }

      .c35 {
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
        -webkit-box-pack: space-around;
        -webkit-justify-content: space-around;
        -ms-flex-pack: space-around;
        justify-content: space-around;
      }

      .c38 {
        -webkit-animation: gzYjWD 1s infinite linear;
        animation: gzYjWD 1s infinite linear;
        will-change: transform;
      }

      .c0 {
        display: grid;
        grid-template-columns: auto 1fr;
      }

      .c34 {
        overflow-x: hidden;
      }

      .c2 {
        padding-top: 24px;
        padding-right: 16px;
        padding-bottom: 8px;
        padding-left: 24px;
      }

      .c6 {
        background: #ffffff;
        padding: 8px;
        border-radius: 4px;
        border-color: #dcdce4;
        border: 1px solid #dcdce4;
        width: 2rem;
        height: 2rem;
        cursor: pointer;
      }

      .c11 {
        padding-top: 16px;
      }

      .c12 {
        background: #eaeaef;
      }

      .c15 {
        padding-top: 8px;
        padding-bottom: 16px;
      }

      .c18 {
        padding-top: 8px;
        padding-right: 16px;
        padding-bottom: 8px;
        padding-left: 24px;
      }

      .c20 {
        padding-right: 24px;
        position: relative;
      }

      .c23 {
        padding-right: 4px;
      }

      .c25 {
        background: #eaeaef;
        padding-right: 8px;
        padding-left: 8px;
        position: absolute;
        right: 0;
        top: 50%;
        min-width: 20px;
        -webkit-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
      }

      .c28 {
        background: #f6f6f9;
        padding-top: 8px;
        padding-bottom: 8px;
        padding-left: 32px;
      }

      .c31 {
        padding-left: 8px;
      }

      .c5 {
        font-weight: 600;
        font-size: 1.125rem;
        line-height: 1.22;
        color: #32324d;
      }

      .c24 {
        font-weight: 600;
        font-size: 0.6875rem;
        line-height: 1.45;
        text-transform: uppercase;
        color: #666687;
      }

      .c32 {
        font-size: 0.875rem;
        line-height: 1.43;
        color: #32324d;
      }

      .c3 {
        -webkit-align-items: flex-start;
        -webkit-box-align: flex-start;
        -ms-flex-align: flex-start;
        align-items: flex-start;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
        -webkit-box-pack: justify;
        -webkit-justify-content: space-between;
        -ms-flex-pack: justify;
        justify-content: space-between;
      }

      .c7 {
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -ms-flex-pack: center;
        justify-content: center;
      }

      .c16 {
        -webkit-align-items: stretch;
        -webkit-box-align: stretch;
        -ms-flex-align: stretch;
        align-items: stretch;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
        gap: 8px;
      }

      .c17 {
        -webkit-align-items: stretch;
        -webkit-box-align: stretch;
        -ms-flex-align: stretch;
        align-items: stretch;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
        gap: 4px;
      }

      .c21 {
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
      }

      .c26 {
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        display: -webkit-inline-box;
        display: -webkit-inline-flex;
        display: -ms-inline-flexbox;
        display: inline-flex;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -ms-flex-pack: center;
        justify-content: center;
      }

      .c8 {
        position: relative;
        outline: none;
      }

      .c8 > svg {
        height: 12px;
        width: 12px;
      }

      .c8 > svg > g,
      .c8 > svg path {
        fill: #ffffff;
      }

      .c8[aria-disabled='true'] {
        pointer-events: none;
      }

      .c8:after {
        -webkit-transition-property: all;
        transition-property: all;
        -webkit-transition-duration: 0.2s;
        transition-duration: 0.2s;
        border-radius: 8px;
        content: '';
        position: absolute;
        top: -4px;
        bottom: -4px;
        left: -4px;
        right: -4px;
        border: 2px solid transparent;
      }

      .c8:focus-visible {
        outline: none;
      }

      .c8:focus-visible:after {
        border-radius: 8px;
        content: '';
        position: absolute;
        top: -5px;
        bottom: -5px;
        left: -5px;
        right: -5px;
        border: 2px solid #4945ff;
      }

      .c10 {
        border: 0;
        -webkit-clip: rect(0 0 0 0);
        clip: rect(0 0 0 0);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        width: 1px;
      }

      .c27 {
        border-radius: 4px;
        height: 1.5rem;
      }

      .c13 {
        height: 1px;
        border: none;
        -webkit-flex-shrink: 0;
        -ms-flex-negative: 0;
        flex-shrink: 0;
        margin: 0;
      }

      .c1 {
        width: 14.5rem;
        background: #f6f6f9;
        position: -webkit-sticky;
        position: sticky;
        top: 0;
        height: 100vh;
        overflow-y: auto;
        border-right: 1px solid #dcdce4;
        z-index: 1;
      }

      .c9 svg > g,
      .c9 svg path {
        fill: #8e8ea9;
      }

      .c9:hover svg > g,
      .c9:hover svg path {
        fill: #666687;
      }

      .c9:active svg > g,
      .c9:active svg path {
        fill: #a5a5ba;
      }

      .c9[aria-disabled='true'] svg path {
        fill: #666687;
      }

      .c14 {
        width: 1.5rem;
        background-color: #dcdce4;
      }

      .c29 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: justify;
        -webkit-justify-content: space-between;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -webkit-text-decoration: none;
        text-decoration: none;
        color: #32324d;
      }

      .c29 svg > * {
        fill: #666687;
      }

      .c29.active {
        background-color: #f0f0ff;
        border-right: 2px solid #4945ff;
      }

      .c29.active svg > * {
        fill: #271fe0;
      }

      .c29.active .c4 {
        color: #271fe0;
        font-weight: 500;
      }

      .c29:focus-visible {
        outline-offset: -2px;
      }

      .c30 {
        width: 0.75rem;
        height: 0.25rem;
      }

      .c30 * {
        fill: #666687;
      }

      .c22 {
        border: none;
        padding: 0;
        background: transparent;
      }

      .c19 svg {
        height: 0.25rem;
      }

      .c19 svg path {
        fill: #8e8ea9;
      }

      .c36 {
        height: 100vh;
      }

      <div
        class="c0"
      >
        <nav
          aria-label="Content"
          class="c1"
        >
          <div
            class="c2"
          >
            <div
              class="c3"
            >
              <h2
                class="c4 c5"
              >
                Content
              </h2>
              <span>
                <button
                  aria-disabled="false"
                  aria-labelledby=":r1:"
                  class="c6 c7 c8 c9"
                  tabindex="0"
                  type="button"
                >
                  <span
                    class="c10"
                  >
                    Search for a content type
                  </span>
                  <svg
                    aria-hidden="true"
                    fill="none"
                    focusable="false"
                    height="1rem"
                    viewBox="0 0 24 24"
                    width="1rem"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clip-rule="evenodd"
                      d="m23.813 20.163-5.3-5.367a9.792 9.792 0 0 0 1.312-4.867C19.825 4.455 15.375 0 9.913 0 4.45 0 0 4.455 0 9.929c0 5.473 4.45 9.928 9.912 9.928a9.757 9.757 0 0 0 5.007-1.4l5.275 5.35a.634.634 0 0 0 .913 0l2.706-2.737a.641.641 0 0 0 0-.907ZM9.91 3.867c3.338 0 6.05 2.718 6.05 6.061s-2.712 6.061-6.05 6.061c-3.337 0-6.05-2.718-6.05-6.06 0-3.344 2.713-6.062 6.05-6.062Z"
                      fill="#32324D"
                      fill-rule="evenodd"
                    />
                  </svg>
                </button>
              </span>
            </div>
            <div
              class="c11"
            >
              <hr
                class="c12 c13 c14"
              />
            </div>
          </div>
          <div
            class="c15"
          >
            <ol
              class="c16"
            >
              <li>
                <div
                  class="c17"
                >
                  <div
                    class="c18 c19"
                  >
                    <div
                      class="c20"
                    >
                      <div
                        class="c21 c22"
                      >
                        <div
                          class="c23"
                        >
                          <span
                            class="c4 c24"
                          >
                            Collection Types
                          </span>
                        </div>
                      </div>
                      <div
                        class="c25 c26 c27"
                        transform="translateY(-50%)"
                      >
                        <span
                          class="c4 c24"
                        >
                          1
                        </span>
                      </div>
                    </div>
                  </div>
                  <ol
                    id=":r3:"
                  >
                    <li>
                      <a
                        aria-current="page"
                        class="c28 c29 active"
                        href="/content-manager/collectionType/category"
                      >
                        <div
                          class="c21"
                        >
                          <svg
                            class="c30"
                            fill="none"
                            height="1rem"
                            viewBox="0 0 4 4"
                            width="1rem"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              fill="#A5A5BA"
                              height="4"
                              rx="2"
                              width="4"
                            />
                          </svg>
                          <div
                            class="c31"
                          >
                            <span
                              class="c4 c32"
                            >
                              Categories
                            </span>
                          </div>
                        </div>
                      </a>
                    </li>
                  </ol>
                </div>
              </li>
              <li>
                <div
                  class="c17"
                >
                  <div
                    class="c18 c19"
                  >
                    <div
                      class="c20"
                    >
                      <div
                        class="c21 c22"
                      >
                        <div
                          class="c23"
                        >
                          <span
                            class="c4 c24"
                          >
                            Single Types
                          </span>
                        </div>
                      </div>
                      <div
                        class="c25 c26 c27"
                        transform="translateY(-50%)"
                      >
                        <span
                          class="c4 c24"
                        >
                          1
                        </span>
                      </div>
                    </div>
                  </div>
                  <ol
                    id=":r4:"
                  >
                    <li>
                      <a
                        class="c28 c29"
                        href="/homepage"
                      >
                        <div
                          class="c21"
                        >
                          <svg
                            class="c30"
                            fill="none"
                            height="1rem"
                            viewBox="0 0 4 4"
                            width="1rem"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              fill="#A5A5BA"
                              height="4"
                              rx="2"
                              width="4"
                            />
                          </svg>
                          <div
                            class="c31"
                          >
                            <span
                              class="c4 c32"
                            >
                              Home page
                            </span>
                          </div>
                        </div>
                      </a>
                    </li>
                  </ol>
                </div>
              </li>
            </ol>
          </div>
        </nav>
        <div
          class="c33 c34"
        >
          <div
            class="c35 c36"
            data-testid="loader"
          >
            <div
              aria-live="assertive"
              role="alert"
            >
              <div
                class="c37"
              >
                Loading content.
              </div>
              <img
                aria-hidden="true"
                class="c38"
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjMiIGhlaWdodD0iNjMiIHZpZXdCb3g9IjAgMCA2MyA2MyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTQyLjU1NjMgMTEuOTgxNkMzOS40ODQgMTAuMzA3MSAzNS44NTc1IDkuMjkwOTcgMzIuMzM1NCA5LjEzNTIxQzI4LjY0NDMgOC45Mjg4OCAyNC44Mjk1IDkuNzIzMTggMjEuMzMzNiAxMS40MTI5QzIwLjkxMjMgMTEuNTkwMSAyMC41Mzc2IDExLjgxMDEgMjAuMTcyMiAxMi4wMjQ5TDIwLjAxMDggMTIuMTE3OUMxOS44Nzc0IDEyLjE5NTEgMTkuNzQ0MSAxMi4yNzI0IDE5LjYwOCAxMi4zNTM2QzE5LjMyNTMgMTIuNTE0NiAxOS4wNDkyIDEyLjY3NDQgMTguNzU0NCAxMi44NzkyQzE4LjU0NjMgMTMuMDMyOSAxOC4zMzk1IDEzLjE3NTkgMTguMTMwMSAxMy4zMjNDMTcuNTY1OCAxMy43MjA4IDE2Ljk4NjggMTQuMTMxNyAxNi40OTgzIDE0LjU5NzlDMTQuODQ3NiAxNS45NTI0IDEzLjU1NzEgMTcuNjA3NSAxMi42MDcxIDE4LjkyMTRDMTAuNDM2NSAyMi4xNTY2IDkuMDg2MjIgMjUuOTU2NyA4LjgwNzAyIDI5LjYxNDNMOC43NzY0IDMwLjE1ODhDOC43MzMyOCAzMC45MTk2IDguNjg0NzYgMzEuNzA1NyA4Ljc1MzUzIDMyLjQ1NTVDOC43NjY0OCAzMi42MDg0IDguNzY2MSAzMi43NjM4IDguNzc1MDYgMzIuOTE0QzguNzg4OTUgMzMuMjI5IDguODAxNTIgMzMuNTM3MyA4Ljg0NiAzMy44NjcyTDkuMDczOTYgMzUuNDIyMUM5LjA5NzU2IDM1LjU3NjQgOS4xMTk4IDM1Ljc0MTMgOS4xNjMzIDM1LjkyNjNMOS42NTkxOSAzNy45MjcyTDEwLjEzOCAzOS4yODIzQzEwLjI3MjkgMzkuNjY3MyAxMC40MTU4IDQwLjA3NTEgMTAuNiA0MC40M0MxMi4wMjkyIDQzLjYzNyAxNC4xNDI1IDQ2LjQ1NzggMTYuNzA2MyA0OC41ODVDMTkuMDUwOCA1MC41Mjk2IDIxLjgyNCA1Mi4wMDIzIDI0Ljc0OTEgNTIuODQ1MkwyNi4yMzcxIDUzLjIzNzZDMjYuMzc4MSA1My4yNjkzIDI2LjQ5MjYgNTMuMjg4OSAyNi42MDMxIDUzLjMwNThMMjYuNzc3NSA1My4zMzExQzI3LjAwNTIgNTMuMzYzNiAyNy4yMTk1IDUzLjM5ODYgMjcuNDQ0NSA1My40MzVDMjcuODU5OCA1My41MDc2IDI4LjI2NzIgNTMuNTc0OCAyOC43MDc5IDUzLjYxODNMMzAuNTY0MSA1My43MjI5QzMwLjk1MTYgNTMuNzI0OSAzMS4zMzUyIDUzLjcwNjggMzEuNzA4MSA1My42ODc0QzMxLjkwMzkgNTMuNjgxIDMyLjA5ODQgNTMuNjY4MSAzMi4zMjg4IDUzLjY2MkMzNC41MjUzIDUzLjQ3NzIgMzYuNTEwNiA1My4wNjM0IDM4LjA1MTYgNTIuNDY1MkMzOC4xNzY5IDUyLjQxNzEgMzguMzAwOCA1Mi4zNzk2IDM4LjQyMzQgNTIuMzM1NUMzOC42NzI3IDUyLjI0OTkgMzguOTI1OSA1Mi4xNjcgMzkuMTQzMiA1Mi4wNTk5TDQwLjg1OTEgNTEuMjYyNkw0Mi41NzAyIDUwLjI2NkM0Mi45MDA5IDUwLjA2ODIgNDMuMDIwNSA0OS42NDE0IDQyLjgyODIgNDkuMjk4NEM0Mi42MzIgNDguOTUyNiA0Mi4yMDM0IDQ4LjgzMDggNDEuODYzNCA0OS4wMTY2TDQwLjE3OTIgNDkuOTIxOEwzOC40OTk1IDUwLjYyMjRDMzguMzE2OSA1MC42OTUzIDM4LjEyMSA1MC43NTM0IDM3LjkyMjQgNTAuODE1NUMzNy43ODM4IDUwLjg0ODkgMzcuNjUxOCA1MC44OTgzIDM3LjUwMTIgNTAuOTQwOEMzNi4wNzExIDUxLjQzNSAzNC4yNDQ1IDUxLjc0MjUgMzIuMjQ0IDUxLjgzNDZDMzIuMDQ0MiA1MS44MzgzIDMxLjg0NzEgNTEuODM3OSAzMS42NTQgNTEuODQwM0MzMS4zMDUxIDUxLjg0MTQgMzAuOTYwMiA1MS44NDUxIDMwLjYzOTIgNTEuODMwNUwyOC45MTc3IDUxLjY3MjVDMjguNTQ3NiA1MS42MTkgMjguMTY5NSA1MS41NDI3IDI3Ljc4NDggNTEuNDY3OEMyNy41NjM5IDUxLjQxNjcgMjcuMzM3NiA1MS4zNzM3IDI3LjEyOTkgNTEuMzM3NEwyNi45NTI5IDUxLjI5ODdDMjYuODcwNCA1MS4yODM0IDI2Ljc3NzIgNTEuMjY2NyAyNi43MzMzIDUxLjI1NDNMMjUuMzQ2NiA1MC44MzIyQzIyLjc2NTEgNDkuOTc4OSAyMC4zMyA0OC41NzI5IDE4LjI5NDIgNDYuNzU1N0MxNi4xMDU2IDQ0Ljc5NTEgMTQuMzMzOSA0Mi4yMzM1IDEzLjE3NDIgMzkuMzU4MkMxMi4wMjc2IDM2LjYwMTMgMTEuNTk4OCAzMy4yNzkyIDExLjk3MTYgMzAuMDA3NkMxMi4zMTQ1IDI3LjAyMTMgMTMuMzk0OCAyNC4xNjM1IDE1LjE4NTggMjEuNTA4M0MxNS4zMDM0IDIxLjMzMzkgMTUuNDIxIDIxLjE1OTYgMTUuNTIxMiAyMS4wMTk2QzE2LjQzMDkgMTkuODY4OCAxNy41NDA4IDE4LjU1ODkgMTguOTQ4MyAxNy40OTZDMTkuMzM2NyAxNy4xNTI1IDE5Ljc4NjIgMTYuODU2IDIwLjI2MTEgMTYuNTQ3OEMyMC40ODc4IDE2LjQwMDkgMjAuNzA3OSAxNi4yNTUzIDIwLjg5MDcgMTYuMTMwNkMyMS4wOTc0IDE2LjAwNDggMjEuMzE4OCAxNS44ODMxIDIxLjUzNDggMTUuNzY5NEMyMS42NzYxIDE1LjY5NzUgMjEuODE2MiAxNS42MTkgMjEuOTM4OCAxNS41NTc2TDIyLjEwMDIgMTUuNDY0NkMyMi40MDAyIDE1LjMwMzcgMjIuNjc0OSAxNS4xNTQ2IDIyLjk5MDggMTUuMDM5TDI0LjExODYgMTQuNTcxNUMyNC4zMzk5IDE0LjQ4NDQgMjQuNTcxOCAxNC40MTU5IDI0Ljc5OTcgMTQuMzQ0N0MyNC45NTMgMTQuMjk4MiAyNS4wOTgyIDE0LjI2MzUgMjUuMjYzNSAxNC4yMDc4QzI1Ljc4NiAxNC4wMTgyIDI2LjMyODMgMTMuOTExMiAyNi45MTA1IDEzLjc5NjVDMjcuMTE3IDEzLjc1NzEgMjcuMzMwMiAxMy43MTYzIDI3LjU2MDggMTMuNjU4NUMyNy43NTUzIDEzLjYxMSAyNy45NzM3IDEzLjU5NjkgMjguMjA4MiAxMy41NzYyQzI4LjM2NCAxMy41NjAzIDI4LjUxNzIgMTMuNTQ4MyAyOC42MzE4IDEzLjUzMzNDMjguNzg3NiAxMy41MTczIDI4LjkzNDIgMTMuNTA2NiAyOS4wOTI3IDEzLjQ4NjdDMjkuMzI4NSAxMy40NTU1IDI5LjU0NTYgMTMuNDM0NyAyOS43NDk0IDEzLjQzMzdDMzAuMDIzNyAxMy40NCAzMC4yOTk0IDEzLjQzNTcgMzAuNTc3NyAxMy40Mjc0QzMxLjA4MTEgMTMuNDIxIDMxLjU1NzkgMTMuNDE5NyAzMi4wMzE4IDEzLjQ5MTRDMzQuOTY2NCAxMy43MzUyIDM3LjcxNDQgMTQuNjA4NSA0MC4yMDUyIDE2LjA4NjhDNDIuMzQ4OSAxNy4zNjU1IDQ0LjI3MTYgMTkuMTUyNSA0NS43NjA3IDIxLjI2NEM0Ny4wMjU1IDIzLjA2MjggNDcuOTc1NiAyNS4wNTI4IDQ4LjQ5MjggMjcuMDM5M0M0OC41NzIgMjcuMzE3NiA0OC42Mjk5IDI3LjU5MzEgNDguNjgzOSAyNy44NjU5QzQ4LjcxNTQgMjguMDQyOCA0OC43NTYzIDI4LjIxNDUgNDguNzg5MiAyOC4zNjM2QzQ4LjgwMzcgMjguNDU0MSA0OC44MjA4IDI4LjU0MDYgNDguODQ0NSAyOC42MjU4QzQ4Ljg3NDkgMjguNzQ0MyA0OC44OTg2IDI4Ljg2NCA0OC45MTE2IDI4Ljk2NTFMNDguOTc5MyAyOS42MDQ3QzQ4Ljk5MjIgMjkuNzc0OCA0OS4wMTMyIDI5LjkzMzEgNDkuMDMwMSAzMC4wODg3QzQ5LjA2NjggMzAuMzI2OCA0OS4wODg5IDMwLjU2MDggNDkuMDk2NCAzMC43NTYxTDQ5LjEwODMgMzEuOTAwMUM0OS4xMzEyIDMyLjMzMDcgNDkuMDg5IDMyLjcxMTYgNDkuMDUyMiAzMy4wNjczQzQ5LjAzODQgMzMuMjU5OCA0OS4wMTI2IDMzLjQ0NDMgNDkuMDEyMyAzMy41ODI0QzQ4Ljk5NjEgMzMuNjkyNiA0OC45OTE4IDMzLjc5MzUgNDguOTgzNiAzMy44OTE3QzQ4Ljk3NTMgMzQuMDA3MiA0OC45NzI0IDM0LjExNDggNDguOTQxNCAzNC4yNTU0TDQ4LjU0NDkgMzYuMzA1OUM0OC4zMTM0IDM3Ljg2MjMgNDkuMzc5MyAzOS4zMzY1IDUwLjk0ODggMzkuNTgyMkM1Mi4wNDE3IDM5Ljc2MDEgNTMuMTUzNiAzOS4yODE5IDUzLjc3MTEgMzguMzY2NEM1NC4wMDYzIDM4LjAxNzYgNTQuMTYwNCAzNy42MjU3IDU0LjIyMjcgMzcuMjA2NEw1NC41MjE3IDM1LjI1NzRDNTQuNTUxNCAzNS4wNzU2IDU0LjU3MiAzNC44MyA1NC41ODQ2IDM0LjU3OTFMNTQuNjAyOCAzNC4yMzM4QzU0LjYwOTggMzQuMDU5OCA1NC42MjIzIDMzLjg3NzkgNTQuNjM0NyAzMy42Nzg4QzU0LjY3MzQgMzMuMTA1MiA1NC43MTYzIDMyLjQ0NzkgNTQuNjYxOSAzMS44MDU4TDU0LjU4NjcgMzAuNDI4OUM1NC41NjIyIDMwLjA5NTIgNTQuNTA5NyAyOS43NiA1NC40NTU5IDI5LjQxODFDNTQuNDMxIDI5LjI1NzIgNTQuNDA0OCAyOS4wODk2IDU0LjM4MjYgMjguOTA3NEw1NC4yNjg3IDI4LjEwNEM1NC4yMzMyIDI3LjkyNDQgNTQuMTgwNCAyNy43MjczIDU0LjEzMjkgMjcuNTM5Nkw1NC4wNjQzIDI3LjI0NTRDNTQuMDE5NSAyNy4wNzEgNTMuOTc3MyAyNi44OTI3IDUzLjkzMzggMjYuNzA3NkM1My44NDU1IDI2LjMzMDkgNTMuNzQ3OSAyNS45NDIyIDUzLjYxMyAyNS41NTcxQzUyLjg0IDIzLjAyOTIgNTEuNTM4MyAyMC41MTk0IDQ5LjgzMzggMTguMjc5OUM0Ny44NTQ0IDE1LjY4MiA0NS4zMzMzIDEzLjUwODcgNDIuNTU2MyAxMS45ODE2WiIgZmlsbD0iIzQ5NDVGRiIvPgo8L3N2Zz4K"
              />
            </div>
          </div>
        </div>
      </div>
    `);
  });

  it('should redirect to the single type', () => {
    const contentManagerState = {
      collectionTypeLinks: [],
      singleTypeLinks: [
        {
          uid: 'homepage',
          title: 'Home page',
          name: 'homepage',
          to: '/content-manager/homepage',
          kind: 'singleType',
          isDisplayed: true,
          permissions: [
            {
              action: 'plugin::content-manager.explorer.read',
              subject: 'homepage',
            },
          ],
        },
      ],
      models: [
        {
          kind: 'collectionType',
          uid: 'category',
          info: { label: 'Categories', name: 'category' },
          isDisplayed: true,
        },
        {
          kind: 'singleType',
          isDisplayed: true,
          uid: 'homepage',
          info: { label: 'Home page', name: 'homepage' },
        },
      ],
      components: [],
      status: 'resolved',
    };
    useContentManagerInitData.mockImplementation(() => contentManagerState);
    const rootReducer = combineReducers(cmReducers);
    const store = createStore(rootReducer, { 'content-manager_app': contentManagerState });
    const history = createMemoryHistory();
    act(() => history.push('/content-manager'));

    render(
      <IntlProvider messages={{}} defaultLocale="en" locale="en">
        <ThemeToggleProvider themes={{ light: lightTheme, dark: darkTheme }}>
          <Theme>
            <DndProvider backend={HTML5Backend}>
              <Provider store={store}>
                <Router history={history}>
                  <ContentManagerApp />
                </Router>
              </Provider>
            </DndProvider>
          </Theme>
        </ThemeToggleProvider>
      </IntlProvider>
    );

    expect(history.location.pathname).toEqual('/content-manager/homepage');
  });

  it('should redirect to 403 page', () => {
    const history = createMemoryHistory();
    const contentManagerState = {
      collectionTypeLinks: [],
      singleTypeLinks: [],
      models: [
        {
          kind: 'collectionType',
          uid: 'category',
          isDisplayed: true,
          info: { label: 'Categories', name: 'category' },
        },
        { kind: 'singleType', uid: 'homepage', info: { label: 'Home page', name: 'homepage' } },
      ],
      components: [],
      status: 'resolved',
    };
    useContentManagerInitData.mockImplementation(() => contentManagerState);
    jest.mock('../useContentManagerInitData', () =>
      jest.fn(() => {
        return contentManagerState;
      })
    );
    const rootReducer = combineReducers(cmReducers);
    const store = createStore(rootReducer, { 'content-manager_app': contentManagerState });
    act(() => history.push('/content-manager/collectionType/category'));

    render(
      <IntlProvider messages={{}} defaultLocale="en" locale="en">
        <ThemeToggleProvider themes={{ light: lightTheme, dark: darkTheme }}>
          <Theme>
            <DndProvider backend={HTML5Backend}>
              <Provider store={store}>
                <Router history={history}>
                  <ContentManagerApp />
                </Router>
              </Provider>
            </DndProvider>
          </Theme>
        </ThemeToggleProvider>
      </IntlProvider>
    );

    expect(history.location.pathname).toEqual('/content-manager/403');
  });

  it('should redirect to the no-content-types page', () => {
    const history = createMemoryHistory();
    const contentManagerState = {
      collectionTypeLinks: [],
      singleTypeLinks: [],
      models: [
        {
          kind: 'collectionType',
          uid: 'category',
          info: { label: 'Categories', name: 'category' },
          isDisplayed: false,
        },
      ],
      components: [],
      status: 'resolved',
    };
    useContentManagerInitData.mockImplementation(() => contentManagerState);
    jest.mock('../useContentManagerInitData', () =>
      jest.fn(() => {
        return contentManagerState;
      })
    );
    const rootReducer = combineReducers(cmReducers);
    const store = createStore(rootReducer, { 'content-manager_app': contentManagerState });
    act(() => history.push('/content-manager/collectionType/category'));

    render(
      <IntlProvider messages={{}} defaultLocale="en" locale="en">
        <ThemeToggleProvider themes={{ light: lightTheme, dark: darkTheme }}>
          <Theme>
            <DndProvider backend={HTML5Backend}>
              <Provider store={store}>
                <Router history={history}>
                  <ContentManagerApp />
                </Router>
              </Provider>
            </DndProvider>
          </Theme>
        </ThemeToggleProvider>
      </IntlProvider>
    );

    expect(history.location.pathname).toEqual('/content-manager/no-content-types');
  });
});
