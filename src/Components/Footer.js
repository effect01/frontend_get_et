
import {Link} from 'react-router-dom';

const Footer = () => {
    return(
     
    <footer class="container-fluid">

    <div class="container">
      <div class="row">
        <div class="col-2">
          <ul>   <Link>
              <p>¿Quienes somos?</p></Link>
              <Link>
              <p>¿Que tiendas son participes?</p></Link>
  
          </ul>
        </div>
        <div class="col-2">
          <ul>   <Link>
                 <p>Terminos de uso</p>
                 </Link>
          </ul>
        </div>
        <div class="col-2">
          <ul>
          <Link>
              <p>Registrarse</p>   </Link>
          <Link>
    
              <p>Como ser Participe</p>
              </Link>
          </ul>
        </div>
        <div class="col-6">
          <div class="newsletter">
            <div >  <Link>
    
                <h2>¿QUIERES QUE TE NOTIFIQUEMOS NUESTRAS NOVEDADES?</h2>
                </Link>
            </div>
             <form class='d-flex '>
             <input type="text"  placeholder="   INGRASETUCORREO@CORREO.COM" />
              <div  >
                  <span>
                        ENVIAR
                  </span>
                  
                  </div>
          
             </form>
             
          </div>
        </div>
      </div>
    </div>

    
    
  </footer>

    )
       
}

export default Footer