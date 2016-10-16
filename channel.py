
import stackless

ch = stackless.channel();

def send(channel):
	print "sending"
	channel.send("test")

def recv(channel):
	print "receiving"
	print channel.receive()

task2 = stackless.tasklet(recv)(ch)
task1 = stackless.tasklet(send)(ch)

stackless.run()

print "sending ends"


