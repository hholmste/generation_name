import org.mortbay.jetty.Server
import org.mortbay.jetty.servlet.*
import groovy.servlet.*
 
@Grab(group='org.mortbay.jetty', module='jetty-embedded', version='6.1.14')
def startJetty() {
  def jetty = new Server(8080)
 
  def context = new Context(jetty, '/', Context.SESSIONS)
  context.resourceBase = '.' 
  context.addServlet(GroovyServlet, '*.groovy')
  context.setAttribute('version', '1.0')

  def fHold = context.addServlet(DefaultServlet, '/')
  fHold.setInitParameter('resourceBase', './static')

  jetty.start()
}
 
println "Starting Jetty, press Ctrl+C to stop."
startJetty()
