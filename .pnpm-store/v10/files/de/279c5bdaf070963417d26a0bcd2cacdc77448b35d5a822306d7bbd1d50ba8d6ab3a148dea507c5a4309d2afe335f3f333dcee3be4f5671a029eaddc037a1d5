/**
 * @typedef {(newLocale: Locale, options?: { reload?: boolean }) => void | Promise<void>} SetLocaleFn
 */
/**
 * Set the locale.
 *
 * Set locale reloads the site by default on the client. Reloading
 * can be disabled by passing \`reload: false\` as an option. If
 * reloading is disabled, you need to ensure that the UI is updated
 * to reflect the new locale.
 *
 * If any custom strategy's \`setLocale\` function is async, then this
 * function will become async as well.
 *
 * @example
 *   setLocale('en');
 *
 * @example
 *   setLocale('en', { reload: false });
 *
 * @type {SetLocaleFn}
 */
export let setLocale: SetLocaleFn;
export function overwriteSetLocale(fn: SetLocaleFn): void;
export type SetLocaleFn = (newLocale: Locale, options?: {
    reload?: boolean;
}) => void | Promise<void>;
//# sourceMappingURL=set-locale.d.ts.map