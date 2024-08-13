"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { UserContext, UserWApproverContext } from "../DashboardLayoutContext";
import { PulseLoader } from "react-spinners";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const FormSchema = z.object({
  apprEmail: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
});

export default function SetApprover({ approvers }) {
  const user = useContext(UserContext);
  const userWApprover = useContext(UserWApproverContext);
  const [redirecting, setRedirecting] = useState(false);
  const [selectedValue, setSelectedValue] = useState(
    userWApprover.appr_email || ""
  );

  const form = useForm({
    resolver: zodResolver(FormSchema),
  });

  const { isSubmitting } = form.formState;

  useEffect(() => {
    // Update form default values if `userWApprover.appr_email` changes
    form.reset({
      apprEmail: userWApprover.appr_email || "",
    });
  }, [userWApprover.appr_email, form]);

  const onSubmit = async (data) => {
    data.userEmail = user.email;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/update-approver`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const msg = await res.json();

    if (msg.variant === "success") {
      if (userWApprover.appr_email) {
        toast({
          variant: msg.variant,
          title: msg.msg,
        });
      } else {
        setRedirecting(true);
        window.location = "/dashboard";
      }
    } else if (msg.variant === "destructive") {
      toast({
        variant: msg.variant,
        title: msg.msg,
      });
    }

    // Update selected value state if needed
    setSelectedValue(data.apprEmail);
  };

  return (
    <>
      <div
        className="flex flex-1 rounded-lg border border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        <div className="flex flex-col gap-1 w-full p-5">
          {userWApprover.appr_email ? (
            ""
          ) : (
            <Alert variant="destructive" className="bg-white mb-10">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>No Approver</AlertTitle>
              <AlertDescription>
                You can't start requesting without setting your approver first.
              </AlertDescription>
            </Alert>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="apprEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Set Approver</FormLabel>
                    <Select
                      value={selectedValue}
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelectedValue(value);
                      }}
                    >
                      <FormControl>
                        <SelectTrigger className="w-72">
                          <SelectValue placeholder="Select an email of your approver" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {approvers.map((approver, i) => (
                          <SelectItem
                            key={approver.gUserName}
                            value={approver.gUserName}
                          >
                            {approver.gUserName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSubmitting || redirecting}>
                {isSubmitting || redirecting ? (
                  <PulseLoader color="white" className="ms-2" />
                ) : (
                  "Update"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
