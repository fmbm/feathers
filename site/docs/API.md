## Functions

<dl>
<dt><a href="#useApi">useApi(config, ready)</a> ⇒</dt>
<dd><p>Access the Feathers API directly, via a specific service</p></dd>
<dt><a href="#useDebounce">useDebounce(value, delay)</a> ⇒</dt>
<dd><p>Debounce a value. Useful during auto-complete typing, to avoid pinging your API too much.</p></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#UseAPIConfig">UseAPIConfig</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#UseAPIResponse">UseAPIResponse</a> : <code>object</code></dt>
<dd></dd>
</dl>

<a name="useApi"></a>

## useApi(config, ready) ⇒
<p>Access the Feathers API directly, via a specific service</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| config | [<code>UseAPIConfig</code>](#UseAPIConfig) | 
| ready | <code>boolean</code> | 

<a name="useDebounce"></a>

## useDebounce(value, delay) ⇒
<p>Debounce a value. Useful during auto-complete typing, to avoid pinging your API too much.</p>

**Kind**: global function  
**Returns**: <p>value from executed function</p>  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>any</code> | <p>value to debounce</p> |
| delay | <code>number</code> | <p>MS to delay</p> |

<a name="UseAPIConfig"></a>

## UseAPIConfig : <code>object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| serviceName | <code>string</code> | <p>Name of the feathers service</p> |
| params | <code>object</code> | <p>Params to find to service.find()</p> |
| onError | <code>function</code> | <p>Callback for when an error occurs</p> |

<a name="UseAPIResponse"></a>

## UseAPIResponse : <code>object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| response | <code>object</code> | <p>Feathers response</p> |
| loading | <code>boolean</code> | <p>Loading state</p> |
| error | <code>error</code> | <p>Feathers service error</p> |

