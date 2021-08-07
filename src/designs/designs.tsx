import DesignInterface from '../components/interfaces/DesignInterface'

import btw21 from './btw21/design'
import classic from './classic/design'

const designs:Record<string,DesignInterface> = {
    "btw21": btw21,
    "classic": classic
}
export default designs