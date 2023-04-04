
class log { }

/**
 *  Generate success log
 */
log.success = (msg, data) => {
  if (msg && data !== undefined) {
    console.log(
     `this otp send to email successfully ${msg}`,
      data
    );
  } else {
    console.log(msg);
  }
};

/**
 *  Generate error log
 */
log.error = (msg, data) => {
  if (msg && data !== undefined) {
    console.log(
      `error in api ${msg}`,
      data
    );
  } else {
    console.log(msg);
  }
};

/**
 *  Generate warning log
 */
log.warn = (msg, data) => {
  if (msg && data !== undefined) {
    console.log(
      `warn message ${msg}`,
      data
    );
  } else {
    console.log(msg);
  }
};

/**
 *  Generate info log
 */
log.info = (msg, data) => {
  if (msg && data !== undefined) {
    console.log(
      `info message ${msg}`,
      data
    );
  } else {
    console.log(msg);
  }
};

export default log;
