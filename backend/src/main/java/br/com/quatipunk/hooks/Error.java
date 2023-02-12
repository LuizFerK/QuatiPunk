package br.com.quatipunk.hooks;

public class Error {
  private Integer status;
  private String message;

  public Error(Integer status, String message) {
    this.status = status;
    this.message = message;
  }

  public static Error notFound() {
    return new Error(404, "Not found");
  }

  public static Error badRequest() {
    return new Error(400, "Bad request");
  }

  public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
}
