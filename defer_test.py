from twisted.internet.defer import Deferred

def callback1(result):
	print "Callback 1 said:", result
	return result

def callback2(result):
	print "Callback 2 said:", result

def callback3(result):
	raise Exception("Callback 3")

def errback1(failure):
	print "Errback 1 had an an error on", failure
	return failure

def errback2(failure):
	raise Exception("Errback 2")

def errback3(failure):
	print "Errback 3 took care of", failure
	return "Everything is fine now."

d = Deferred()
d.addCallback(callback1)
d.addCallback(callback2)
d.addCallback(callback3, errback3)

#d.addErrback(errback3)
d.callback("Test")


"""
Difference between pypy and python!!!!!!

PyPy will swallow Unhandled Exception!!!!

susan@susan:~/workspace/jsstuff$ pypy defer_test.py 
Callback 1 said: Test
Callback 2 said: Test
susan@susan:~/workspace/jsstuff$ python defer_test.py 
Callback 1 said: Test
Callback 2 said: Test
Unhandled error in Deferred:


Traceback (most recent call last):
  File "defer_test.py", line 28, in <module>
    d.callback("Test")
  File "/home/susan/.local/lib/python2.7/site-packages/twisted/internet/defer.py", line 393, in callback
    self._startRunCallbacks(result)
  File "/home/susan/.local/lib/python2.7/site-packages/twisted/internet/defer.py", line 501, in _startRunCallbacks
    self._runCallbacks()
--- <exception caught here> ---
  File "/home/susan/.local/lib/python2.7/site-packages/twisted/internet/defer.py", line 588, in _runCallbacks
    current.result = callback(current.result, *args, **kw)
  File "defer_test.py", line 11, in callback3
    raise Exception("Callback 3")
exceptions.Exception: Callback 3



"""

