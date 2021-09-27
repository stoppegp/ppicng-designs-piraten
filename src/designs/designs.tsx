import DesignInterface from '../components/interfaces/DesignInterface'

import btw21 from './btw21/design'
import classic from './classic/design'
import classiceu from './classic-eu/design'

const designs:Record<string,DesignInterface> = {
    "classic": classic,
    "btw21": btw21,
    "classic-eu": classiceu
}
export default designs